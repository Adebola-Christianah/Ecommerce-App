# Generated by Django 5.0.7 on 2024-08-31 09:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0003_remove_category_background_theme_color_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='media',
            name='img',
            field=models.ImageField(blank=True, default='/placeholder.png', null=True, upload_to=''),
        ),
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, default='/placeholder.png', null=True, upload_to=''),
        ),
    ]
