# Generated by Django 4.0.3 on 2022-12-03 02:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shoes_rest', '0003_binvo_bin_size'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='binvo',
            name='bin_number',
        ),
        migrations.RemoveField(
            model_name='binvo',
            name='bin_size',
        ),
        migrations.AddField(
            model_name='binvo',
            name='import_href',
            field=models.CharField(max_length=100, null=True, unique=True),
        ),
    ]
