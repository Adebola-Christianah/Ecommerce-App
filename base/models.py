from django.contrib.auth.models import User
from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=200, unique=True)
    theme_color = models.CharField(max_length=7, null=True, blank=True)
    image = models.ImageField(upload_to='category_images/', null=True, blank=True)
    subcategories = models.ManyToManyField('Subcategory', related_name='parent_categories', blank=True)

    def __str__(self):
        return self.name


class Brand(models.Model):
    name = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.name


class Subcategory(models.Model):
    name = models.CharField(max_length=200, unique=True)
    categories = models.ManyToManyField(Category, related_name='subcategory_set', blank=True)
    image = models.ImageField(upload_to='subcategory_images/', null=True, blank=True)

    def __str__(self):
        return self.name


class SpecialOffer(models.Model):
    OFFER_CHOICES = [
        ('clearance', 'Clearance Sale'),
        ('flash', 'Flash Sale'),
        ('deal', 'Special Deal'),
        ('bestseller', 'Best Selling Product'),
        # Add more offer types here
    ]
    offer_type = models.CharField(max_length=50, choices=OFFER_CHOICES)
    start_date = models.DateTimeField(null=True, blank=True)
    end_date = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.get_offer_type_display()


class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True, default='/placeholder.png')
    brands = models.ManyToManyField(Brand, blank=True)
    categories = models.ManyToManyField(Category, blank=True)
    subcategories = models.ManyToManyField(Subcategory, blank=True, related_name='products')
    description = models.TextField(null=True, blank=True)
    rating = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    countInStock = models.IntegerField(null=True, blank=True, default=0)
    discount = models.IntegerField(null=True, blank=True)
    new_price = models.DecimalField(max_digits=9, decimal_places=2, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    special_offers = models.ManyToManyField(SpecialOffer, related_name='products', blank=True)  # Add this line
    _id = models.BigAutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name


class Thumbnail(models.Model):
    product = models.ForeignKey(Product, related_name='thumbnails', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='thumbnails/')

    def __str__(self):
        return f'Thumbnail for {self.product.name}'


class VariationType(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class VariationValue(models.Model):
    variation_type = models.ForeignKey(VariationType, related_name='values', on_delete=models.CASCADE)
    value = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.variation_type.name}: {self.value}'


class Variation(models.Model):
    product = models.ForeignKey(Product, related_name='variations', on_delete=models.CASCADE)
    variation_type = models.ForeignKey(VariationType, on_delete=models.CASCADE)
    values = models.ManyToManyField(VariationValue, related_name='variations')

    def __str__(self):
        values = ', '.join([str(value) for value in self.values.all()])
        return f'{self.variation_type.name}: {values} for {self.product.name}'


class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.BigAutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.rating)


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    paymentMethod = models.CharField(max_length=200, null=True, blank=True)
    taxPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    totalPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    deliveryPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    deliveryTerms = models.TextField(null=True, blank=True)
    deliveryDays = models.IntegerField(null=True, blank=True)
    _id = models.BigAutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.createdAt)


class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    qty = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    image = models.CharField(max_length=200, null=True, blank=True)
    _id = models.BigAutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.name)


class ShippingAddress(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, null=True, blank=True)
    address = models.CharField(max_length=200, null=True, blank=True)
    city = models.CharField(max_length=200, null=True, blank=True)
    postalCode = models.CharField(max_length=200, null=True, blank=True)
    country = models.CharField(max_length=200, null=True, blank=True)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    deliveryDetails = models.TextField(null=True, blank=True)
    _id = models.BigAutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.address)
