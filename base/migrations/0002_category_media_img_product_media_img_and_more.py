# Generated by Django 5.0.7 on 2024-08-13 23:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='media_img',
            field=models.ImageField(blank=True, default='/placeholder.png', null=True, upload_to=''),
        ),
        migrations.AddField(
            model_name='product',
            name='media_img',
            field=models.ImageField(blank=True, default='/placeholder.png', null=True, upload_to=''),
        ),
        migrations.AddField(
            model_name='specialoffer',
            name='media_img',
            field=models.ImageField(blank=True, default='/placeholder.png', null=True, upload_to=''),
        ),
    ]
