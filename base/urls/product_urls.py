from django.urls import path
from base.views import product_views as views

urlpatterns = [
    path('', views.getProducts, name="products"),
    path('create/', views.createProduct, name="product-create"),
    path('upload/', views.uploadImage, name="image-upload"),
    path('<str:pk>/reviews/', views.createProductReview, name="create-review"),
    path('top/', views.getTopProducts, name='top-products'),
    path('<str:pk>/', views.getProduct, name="product"),
    path('update/<str:pk>/', views.updateProduct, name="product-update"),
    path('delete/<str:pk>/', views.deleteProduct, name="product-delete"),
    path('categories/<str:category_id>/subcategories/<str:subcategory_id>/products/', views.getProductsByCategoryAndSubcategory, name='products-by-category-and-subcategory'),
    path('shipping-addresses/<int:pk>/', views.shipping_address_detail, name='shipping-address-detail'),

    # Add the URL pattern for special offers
    path('special-offers/', views.getSpecialOffers, name="special-offers"),
]
