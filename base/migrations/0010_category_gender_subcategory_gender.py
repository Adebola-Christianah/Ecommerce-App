# Generated by Django 5.0.7 on 2024-09-07 17:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0009_remove_category_gender_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='gender',
            field=models.CharField(blank=True, choices=[('men', 'Men'), ('women', 'Women'), ('unisex', 'Unisex')], max_length=10, null=True),
        ),
        migrations.AddField(
            model_name='subcategory',
            name='gender',
            field=models.CharField(blank=True, choices=[('men', 'Men'), ('women', 'Women'), ('unisex', 'Unisex')], max_length=10, null=True),
        ),
    ]
