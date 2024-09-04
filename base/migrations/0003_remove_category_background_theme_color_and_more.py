# Generated by Django 5.0.7 on 2024-08-31 08:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_category_media_img_product_media_img_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='category',
            name='background_theme_color',
        ),
        migrations.RemoveField(
            model_name='category',
            name='button_theme_color',
        ),
        migrations.RemoveField(
            model_name='category',
            name='call_to_action_text',
        ),
        migrations.RemoveField(
            model_name='category',
            name='caption',
        ),
        migrations.RemoveField(
            model_name='category',
            name='clip_theme_color',
        ),
        migrations.RemoveField(
            model_name='category',
            name='media',
        ),
        migrations.RemoveField(
            model_name='category',
            name='media_img',
        ),
        migrations.RemoveField(
            model_name='category',
            name='media_title',
        ),
        migrations.RemoveField(
            model_name='category',
            name='text_theme_color',
        ),
        migrations.RemoveField(
            model_name='product',
            name='background_theme_color',
        ),
        migrations.RemoveField(
            model_name='product',
            name='button_theme_color',
        ),
        migrations.RemoveField(
            model_name='product',
            name='call_to_action_text',
        ),
        migrations.RemoveField(
            model_name='product',
            name='caption',
        ),
        migrations.RemoveField(
            model_name='product',
            name='clip_theme_color',
        ),
        migrations.RemoveField(
            model_name='product',
            name='media',
        ),
        migrations.RemoveField(
            model_name='product',
            name='media_img',
        ),
        migrations.RemoveField(
            model_name='product',
            name='media_title',
        ),
        migrations.RemoveField(
            model_name='product',
            name='text_theme_color',
        ),
        migrations.RemoveField(
            model_name='specialoffer',
            name='background_theme_color',
        ),
        migrations.RemoveField(
            model_name='specialoffer',
            name='button_theme_color',
        ),
        migrations.RemoveField(
            model_name='specialoffer',
            name='call_to_action_text',
        ),
        migrations.RemoveField(
            model_name='specialoffer',
            name='caption',
        ),
        migrations.RemoveField(
            model_name='specialoffer',
            name='clip_theme_color',
        ),
        migrations.RemoveField(
            model_name='specialoffer',
            name='media',
        ),
        migrations.RemoveField(
            model_name='specialoffer',
            name='media_img',
        ),
        migrations.RemoveField(
            model_name='specialoffer',
            name='media_title',
        ),
        migrations.RemoveField(
            model_name='specialoffer',
            name='text_theme_color',
        ),
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, default='placeholder.png', null=True, upload_to=''),
        ),
        migrations.CreateModel(
            name='Media',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('img', models.ImageField(blank=True, default='placeholder.png', null=True, upload_to='')),
                ('caption', models.CharField(blank=True, max_length=255, null=True)),
                ('call_to_action_text', models.CharField(blank=True, max_length=255, null=True)),
                ('button_theme_color', models.CharField(blank=True, max_length=7, null=True)),
                ('text_theme_color', models.CharField(blank=True, max_length=7, null=True)),
                ('clip_theme_color', models.CharField(blank=True, max_length=7, null=True)),
                ('background_theme_color', models.CharField(blank=True, max_length=7, null=True)),
                ('categories', models.ManyToManyField(blank=True, related_name='media', to='base.category')),
                ('products', models.ManyToManyField(blank=True, related_name='media', to='base.product')),
                ('special_offers', models.ManyToManyField(blank=True, related_name='media', to='base.specialoffer')),
                ('subcategories', models.ManyToManyField(blank=True, related_name='media', to='base.subcategory')),
            ],
        ),
    ]
