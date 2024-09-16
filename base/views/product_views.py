from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework import status
from django.db.models import Q
from base.models import (
    Product, Review, Thumbnail, Variation,
    Category, Brand, Subcategory, ShippingAddress,
    SpecialOffer,Media,Order,Wishlist
)
from base.serializers import (
    ProductSerializer, ReviewSerializer, ThumbnailSerializer,
    VariationSerializer, CategorySerializer, BrandSerializer,
    SubcategorySerializer, ShippingAddressSerializer,
    SpecialOfferSerializer,MediaSerializer,WishlistSerializer
)

@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword', '')

    if query:
        # Search products by name
        product_queryset = Product.objects.filter(name__icontains=query).order_by('-createdAt')
        products = Product.objects.filter(name__icontains=query).order_by('-createdAt')
        # Search for categories and subcategories
        category_queryset = Category.objects.filter(
            Q(name__icontains=query) | Q(subcategories__name__icontains=query)
        )
        
        # Get all IDs of matched categories and subcategories
        category_ids = category_queryset.values_list('id', flat=True)
        
        # Get products for matched categories and subcategories
        if category_ids:
            product_queryset = product_queryset | Product.objects.filter(categories__in=category_ids)
        
        # Remove duplicates
        products = product_queryset.distinct().order_by('-createdAt')
    else:
        # If no keyword is provided, get all products
        products = Product.objects.all().order_by('-createdAt')

    # Pagination logic
    page = request.query_params.get('page', 1)
    paginator = Paginator(products, 10)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    page = int(page)

    # Serialize products
    serializer = ProductSerializer(products, many=True)

    return Response({'products': serializer.data, 'page': page, 'pages': paginator.num_pages})
    query = request.query_params.get('keyword', '')
   

    page = request.query_params.get('page', 1)
    paginator = Paginator(products, 10)

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
    all_media = Media.objects.all()
    print(all_media)
    media_serializer = MediaSerializer(all_media, many=True)
    return Response({
         "media":media_serializer.data
    })

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
        # Fetch the product
        product = Product.objects.get(_id=pk)
    except Product.DoesNotExist:
        return Response({'detail': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

    data = request.data

    # Check if the user has purchased the product
    has_purchased = Order.objects.filter(
        user=user,
        isPaid=True,
        orderitem__product=product
    ).exists()

    if not has_purchased:
        return Response({'detail': 'You can only review products you have purchased'}, status=status.HTTP_400_BAD_REQUEST)

    # Check if review already exists
    if product.review_set.filter(user=user).exists():
        return Response({'detail': 'You have already reviewed this product'}, status=status.HTTP_400_BAD_REQUEST)

    # Validate rating
    rating = int(data.get('rating'))
    if rating is None or rating <= 0:
        return Response({'detail': 'Please select a valid rating between 1 and 5'}, status=status.HTTP_400_BAD_REQUEST)

    # Create review
    try:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=rating,
            comment=data.get('comment', ''),
        )
    except Exception as e:
        return Response({'detail': 'An error occurred while creating the review. Please try again.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Update product ratings
    reviews = product.review_set.all()
    product.numReviews = reviews.count()

    total = sum([r.rating for r in reviews])
    product.rating = total / len(reviews) if reviews else 0
    product.save()

    return Response({'detail': 'Review added successfully'}, status=status.HTTP_201_CREATED)
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
    gender = request.query_params.get('gender', None)
    categories = Category.objects.filter(isMajorCategory=True)
    
    if gender:
        categories = categories.filter(gender=gender)
        
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
        print(subcategory)
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
@api_view(['GET'])
def getProductsByCategory(request, category_id):
    try:
        category = Category.objects.get(id=category_id)
    except Category.DoesNotExist:
        return Response({'detail': 'Category not found'}, status=status.HTTP_404_NOT_FOUND)

    # Get child categories of the selected category
    child_categories = Category.objects.filter(parent=category)

    # Get products for both the main category and its child categories
    products = Product.objects.filter(categories__in=[category, *child_categories]).distinct()

    # Serialize the products
    serializer = ProductSerializer(products, many=True)

    return Response(serializer.data)

@api_view(['GET'])
def get_wishlist(request):
    wishlist = Wishlist.objects.filter(user=request.user).order_by('-createdAt')
    serializer = WishlistSerializer(wishlist, many=True)
    return Response(serializer.data)

# Add an item to the wishlist
@api_view(['POST'])
def add_to_wishlist(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    wishlist_item, created = Wishlist.objects.get_or_create(user=request.user, product=product)

    if created:
        return Response({'message': 'Item added to wishlist'}, status=status.HTTP_201_CREATED)
    else:
        return Response({'message': 'Item already in wishlist'}, status=status.HTTP_200_OK)

# Remove an item from the wishlist
@api_view(['DELETE'])
def remove_from_wishlist(request, product_id):
    wishlist_item = get_object_or_404(Wishlist, user=request.user, product_id=product_id)
    wishlist_item.delete()
    return Response({'message': 'Item removed from wishlist'}, status=status.HTTP_204_NO_CONTENT)