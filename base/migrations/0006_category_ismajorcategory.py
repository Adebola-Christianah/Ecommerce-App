# Generated by Django 5.0.7 on 2024-09-07 10:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0005_alter_media_img'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='isMajorCategory',
            field=models.BooleanField(default=False),
        ),
    ]