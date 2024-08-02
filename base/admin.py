from django.contrib import admin
from .models import (
    Product, Thumbnail, VariationType, Variation, VariationValue,
    Category, Brand, Review, Order, OrderItem, ShippingAddress,
    Subcategory, SpecialOffer
)

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

    def formset_factory(self, *args, **kwargs):
        kwargs['formset'] = VariationInlineFormSet
        return super().formset_factory(*args, **kwargs)

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'countInStock', 'createdAt')
    list_filter = ('createdAt',)
    search_fields = ('name', 'description', 'categories__name', 'brands__name')
    inlines = [ThumbnailInline, VariationInline]
    filter_horizontal = ('special_offers', 'brands', 'categories', 'subcategories')  # Add 'special_offers' here

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'theme_color', 'image')
    search_fields = ('name',)

@admin.register(Subcategory)
class SubcategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'image')
    search_fields = ('name',)
    filter_horizontal = ('categories',)

@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ('name',)

@admin.register(SpecialOffer)
class SpecialOfferAdmin(admin.ModelAdmin):
    list_display = ('offer_type', 'start_date', 'end_date')  # Correct the fields
    search_fields = ('offer_type',)

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
    list_display = ('user', 'totalPrice', 'isPaid', 'paidAt', 'isDelivered', 'deliveredAt', 'createdAt', 'deliveryPrice', 'deliveryDays')
    list_filter = ('isPaid', 'isDelivered', 'createdAt')
    search_fields = ('user__username', 'totalPrice', 'deliveryPrice', 'deliveryTerms', 'deliveryDays')

@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('product', 'order', 'name', 'qty', 'price')
    search_fields = ('product__name', 'order__user__username')

@admin.register(ShippingAddress)
class ShippingAddressAdmin(admin.ModelAdmin):
    list_display = ('order', 'address', 'city', 'postalCode', 'country', 'shippingPrice')
    search_fields = ('order__user__username', 'address', 'city', 'postalCode', 'country')
