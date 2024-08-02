from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework import status

from base.models import (
    Product, Review, Thumbnail, Variation,
    Category, Brand, Subcategory, ShippingAddress,
    SpecialOffer
)
from base.serializers import (
    ProductSerializer, ReviewSerializer, ThumbnailSerializer,
    VariationSerializer, CategorySerializer, BrandSerializer,
    SubcategorySerializer, ShippingAddressSerializer,
    SpecialOfferSerializer
)

@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword', '')
    products = Product.objects.filter(name__icontains=query).order_by('-createdAt')

    page = request.query_params.get('page', 1)
    paginator = Paginator(products, 5)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    page = int(page)
    serializer = ProductSerializer(products, many=True)
    return Response({'products': serializer.data, 'page': page, 'pages': paginator.num_pages})

@api_view(['GET'])
def getTopProducts(request):
    products = Product.objects.filter(rating__gte=4).order_by('-rating')[:5]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProduct(request, pk):
    try:
        product = Product.objects.get(_id=pk)
    except Product.DoesNotExist:
        return Response({'detail': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = ProductSerializer(product, many=False)

    # Extract variations and transform them into the desired format
    variations = product.variations.all()
    variation_data = {}
    for variation in variations:
        variation_values = variation.values.all()
        for value in variation_values:
            variation_type_name = value.variation_type.name
            if variation_type_name not in variation_data:
                variation_data[variation_type_name] = []
            variation_data[variation_type_name].append(value.value)

    # Merge the transformed variations data with the product data
    product_data = serializer.data
    product_data['variations'] = variation_data

    return Response(product_data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user

    product = Product.objects.create(
        user=user,
        name='Sample Name',
        price=0,
        countInStock=0,
        description=''
    )

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    try:
        product = Product.objects.get(_id=pk)
    except Product.DoesNotExist:
        return Response({'detail': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

    data = request.data
    product.name = data.get('name', product.name)
    product.price = data.get('price', product.price)
    product.countInStock = data.get('countInStock', product.countInStock)
    product.description = data.get('description', product.description)

    # Update categories, subcategories, and brands if provided
    if 'categories' in data:
        product.categories.set(data['categories'])
    if 'subcategories' in data:
        product.subcategories.set(data['subcategories'])
    if 'brands' in data:
        product.brands.set(data['brands'])

    product.save()

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    try:
        product = Product.objects.get(_id=pk)
        product.delete()
        return Response({'detail': 'Product Deleted'})
    except Product.DoesNotExist:
        return Response({'detail': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def uploadImage(request):
    data = request.data

    try:
        product_id = data['product_id']
        product = Product.objects.get(_id=product_id)
    except Product.DoesNotExist:
        return Response({'detail': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

    product.image = request.FILES.get('image')
    product.save()

    return Response('Image was uploaded')

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    try:
        product = Product.objects.get(_id=pk)
    except Product.DoesNotExist:
        return Response({'detail': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

    data = request.data

    # Check if review already exists
    if product.review_set.filter(user=user).exists():
        return Response({'detail': 'Product already reviewed'}, status=status.HTTP_400_BAD_REQUEST)

    # Validate rating
    if data.get('rating') == 0:
        return Response({'detail': 'Please select a rating'}, status=status.HTTP_400_BAD_REQUEST)

    # Create review
    review = Review.objects.create(
        user=user,
        product=product,
        name=user.first_name,
        rating=data['rating'],
        comment=data.get('comment', ''),
    )

    reviews = product.review_set.all()
    product.numReviews = len(reviews)

    total = sum([r.rating for r in reviews])
    product.rating = total / len(reviews) if reviews else 0
    product.save()

    return Response('Review Added')

@api_view(['GET', 'PUT', 'DELETE'])
def shipping_address_detail(request, pk):
    try:
        shipping_address = ShippingAddress.objects.get(pk=pk)
    except ShippingAddress.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ShippingAddressSerializer(shipping_address)
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = ShippingAddressSerializer(shipping_address, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        shipping_address.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def getCategories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getSubcategories(request):
    subcategories = Subcategory.objects.all()
    serializer = SubcategorySerializer(subcategories, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getCategory(request, pk):
    try:
        category = Category.objects.get(id=pk)
    except Category.DoesNotExist:
        return Response({'detail': 'Category not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = CategorySerializer(category, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def getSubcategory(request, pk):
    try:
        subcategory = Subcategory.objects.get(id=pk)
    except Subcategory.DoesNotExist:
        return Response({'detail': 'Subcategory not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = SubcategorySerializer(subcategory, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def getProductsByCategoryAndSubcategory(request, category_id, subcategory_id):
    try:
        category = Category.objects.get(id=category_id)
    except Category.DoesNotExist:
        return Response({'detail': 'Category not found'}, status=status.HTTP_404_NOT_FOUND)

    try:
        subcategory = Subcategory.objects.get(id=subcategory_id)
    except Subcategory.DoesNotExist:
        return Response({'detail': 'Subcategory not found'}, status=status.HTTP_404_NOT_FOUND)

    products = Product.objects.filter(categories=category, subcategories=subcategory)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProductsBySubcategory(request, subcategory_id):
    try:
        subcategory = Subcategory.objects.get(id=subcategory_id)
    except Subcategory.DoesNotExist:
        return Response({'detail': 'Subcategory not found'}, status=status.HTTP_404_NOT_FOUND)

    products = Product.objects.filter(subcategories=subcategory)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getSpecialOffers(request):
    # Fetch all active special offers
    special_offers = SpecialOffer.objects.all()
    serializer = SpecialOfferSerializer(special_offers, many=True)
    return Response(serializer.data)
