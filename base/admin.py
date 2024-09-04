from django.contrib import admin
from .models import (
    Product, Thumbnail, VariationType, Variation, VariationValue,
    Category, Brand, Review, Order, OrderItem, ShippingAddress,
    Subcategory, SpecialOffer, ProductSpecification, Media
)
from django.utils.html import format_html

class ThumbnailInline(admin.TabularInline):
    model = Thumbnail
    extra = 1

class VariationValueInline(admin.TabularInline):
    model = VariationValue
    extra = 1

class VariationInline(admin.TabularInline):
    model = Variation
    extra = 1
    fields = ('variation_type', 'values')

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'theme_color', 'image_tag')
    search_fields = ('name',)
    filter_horizontal = ('subcategories',)

    def image_tag(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="100" height="100" />', obj.image.url)
        return 'No image'
    image_tag.short_description = 'Image'

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'SKU', 'price', 'countInStock', 'createdAt', 'image_tag')
    search_fields = ('name', 'description', 'SKU', 'categories__name', 'brands__name')
    inlines = [ThumbnailInline, VariationInline]
    filter_horizontal = ('categories', 'brands', 'subcategories', 'special_offers')

    def image_tag(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="100" height="100" />', obj.image.url)
        return 'No image'
    image_tag.short_description = 'Image'

@admin.register(Subcategory)
class SubcategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'image_tag')
    search_fields = ('name',)
    filter_horizontal = ('categories',)

    def image_tag(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="100" height="100" />', obj.image.url)
        return 'No image'
    image_tag.short_description = 'Image'

@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ('name',)

@admin.register(SpecialOffer)
class SpecialOfferAdmin(admin.ModelAdmin):
    list_display = ('offer_type', 'start_date', 'end_date', 'media_img_tag')
    search_fields = ('offer_type',)

    def media_img_tag(self, obj):
        if obj.media_img:
            return format_html('<img src="{}" width="100" height="100" />', obj.media_img.url)
        return 'No image'
    media_img_tag.short_description = 'Media Image'

@admin.register(VariationType)
class VariationTypeAdmin(admin.ModelAdmin):
    list_display = ('name',)
    inlines = [VariationValueInline]

@admin.register(VariationValue)
class VariationValueAdmin(admin.ModelAdmin):
    list_display = ('variation_type', 'value')
    list_filter = ('variation_type',)
    search_fields = ('value',)

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('product', 'user', 'rating', 'createdAt')
    list_filter = ('createdAt', 'rating')
    search_fields = ('product__name', 'user__username')

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('user', 'totalPrice', 'isPaid', 'paidAt', 'isDelivered', 'deliveredAt', 'createdAt')
    list_filter = ('isPaid', 'isDelivered', 'createdAt')
    search_fields = ('user__username', 'totalPrice')

@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('product', 'order', 'name', 'qty', 'price')
    search_fields = ('product__name', 'order__user__username')

@admin.register(ShippingAddress)
class ShippingAddressAdmin(admin.ModelAdmin):
    list_display = ('order', 'address', 'city', 'postalCode', 'country', 'shippingPrice')
    search_fields = ('order__user__username', 'address', 'city', 'postalCode', 'country')

@admin.register(ProductSpecification)
class ProductSpecificationAdmin(admin.ModelAdmin):
    list_display = ('product', 'title', 'value')
    search_fields = ('product__name', 'title', 'value')

@admin.register(Media)
class MediaAdmin(admin.ModelAdmin):
    list_display = ('title', 'img_tag', 'caption', 'call_to_action_text', 'button_theme_color', 'text_theme_color', 'clip_theme_color', 'background_theme_color')
    search_fields = ('title', 'caption', 'call_to_action_text')

    def img_tag(self, obj):
        if obj.img:
            return format_html('<img src="{}" width="100" height="100" />', obj.img.url)
        return 'No image'
    img_tag.short_description = 'Image'
