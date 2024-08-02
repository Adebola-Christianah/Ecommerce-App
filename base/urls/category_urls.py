from django.urls import path
from base.views import product_views as views

urlpatterns = [

    path('', views.getCategories, name='categories'),
    path('<str:pk>/', views.getCategory, name='category'),
    path('subcategories/', views.getSubcategories, name='subcategories'),
    path('subcategories/<str:pk>/', views.getSubcategory, name='subcategory'),

    path('subcategories/<str:subcategory_id>/products/', views.getProductsBySubcategory, name='products-by-subcategory'),
]
