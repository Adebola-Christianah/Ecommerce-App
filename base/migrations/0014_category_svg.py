# Generated by Django 5.0.7 on 2024-09-11 22:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0013_category_gender'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='svg',
            field=models.TextField(blank=True, null=True),
        ),
    ]
