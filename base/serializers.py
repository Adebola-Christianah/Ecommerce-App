from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import (
    Product, Order, OrderItem, ShippingAddress, Review, Thumbnail,
    Variation, VariationType, Category, Brand, VariationValue,
    Subcategory, SpecialOffer, ProductSpecification,Media
)

class ProductSpecificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductSpecification
        fields = ['id', 'title', 'value']

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin']

    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_name(self, obj):
        return obj.first_name if obj.first_name else obj.email

class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class ThumbnailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Thumbnail
        fields = ['id', 'image']

class VariationValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = VariationValue
        fields = '__all__'

class VariationSerializer(serializers.ModelSerializer):
    values = VariationValueSerializer(many=True, read_only=True)

    class Meta:
        model = Variation
        fields = ['id', 'variation_type', 'values']

class SubcategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Subcategory
        fields = ['id', 'name', 'image']

class CategorySerializer(serializers.ModelSerializer):
    subcategories = SubcategorySerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'theme_color', 'image', 'subcategories']

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ['id', 'name']

class SpecialOfferSerializer(serializers.ModelSerializer):
    products = serializers.SerializerMethodField()

    class Meta:
        model = SpecialOffer
        fields = ['id', 'offer_type', 'start_date', 'end_date', 'products']

    def get_products(self, obj):
        products = obj.products.all()
        return ProductSerializer(products, many=True).data

class ProductSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)
    thumbnails = ThumbnailSerializer(many=True, read_only=True)
    variations = VariationSerializer(many=True, read_only=True)
    categories = CategorySerializer(many=True, read_only=True)
    subcategories = SubcategorySerializer(many=True, read_only=True)
    brands = BrandSerializer(many=True, read_only=True)
    special_offers = SpecialOfferSerializer(many=True, read_only=True)
    specifications = ProductSpecificationSerializer(many=True, read_only=True)  # Add this line

    class Meta:
        model = Product
        fields = '__all__'

    def get_reviews(self, obj):
        reviews = obj.review_set.all()
        serializer = ReviewSerializer(reviews, many=True)
        return serializer.data

class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'

    def get_orderItems(self, obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data

    def get_shippingAddress(self, obj):
        try:
            address = ShippingAddressSerializer(obj.shippingaddress).data
        except ShippingAddress.DoesNotExist:
            address = None
        return address

    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data
class MediaSerializer(serializers.ModelSerializer):
    products = serializers.SerializerMethodField()
    categories = serializers.SerializerMethodField()
    subcategories = serializers.SerializerMethodField()
    special_offers = serializers.SerializerMethodField()

    class Meta:
        model = Media
        fields = ['id', 'title', 'img', 'caption', 'call_to_action_text', 'button_theme_color', 'text_theme_color', 'clip_theme_color', 'background_theme_color', 'products', 'categories', 'subcategories', 'special_offers']

    def get_products(self, obj):
        return ProductSerializer(obj.products.all(), many=True).data

    def get_categories(self, obj):
        return CategorySerializer(obj.categories.all(), many=True).data

    def get_subcategories(self, obj):
        return SubcategorySerializer(obj.subcategories.all(), many=True).data

    def get_special_offers(self, obj):
        return SpecialOfferSerializer(obj.special_offers.all(), many=True).data