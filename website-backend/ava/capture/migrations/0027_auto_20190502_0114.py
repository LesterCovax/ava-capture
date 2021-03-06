# -*- coding: utf-8 -*-
# Generated by Django 1.11.16 on 2019-05-02 01:14
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('capture', '0026_capturenode_os'),
    ]

    operations = [
        migrations.AddField(
            model_name='capturelocation',
            name='image_format',
            field=models.CharField(default='raw', max_length=8),
        ),
        migrations.AddField(
            model_name='capturelocation',
            name='wb_B',
            field=models.FloatField(default=2.65),
        ),
        migrations.AddField(
            model_name='capturelocation',
            name='wb_G',
            field=models.FloatField(default=1.0),
        ),
        migrations.AddField(
            model_name='capturelocation',
            name='wb_R',
            field=models.FloatField(default=1.37),
        ),
        migrations.AddField(
            model_name='capturenode',
            name='build_version',
            field=models.CharField(default='', max_length=64),
        ),
    ]
