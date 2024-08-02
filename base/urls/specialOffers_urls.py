from django.urls import path
from base.views import product_views as views

urlpatterns = [
    # Add the URL pattern for special offers
    path('', views.getSpecialOffers, name="special-offers"),
]
