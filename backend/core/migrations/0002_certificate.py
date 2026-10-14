from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Certificate",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(max_length=255)),
                ("issuer", models.CharField(max_length=255)),
                ("category", models.CharField(blank=True, max_length=100)),
                ("date_label", models.CharField(blank=True, max_length=100)),
                ("url", models.URLField(blank=True)),
                ("file", models.FileField(blank=True, upload_to="certificates/")),
                ("order", models.PositiveIntegerField(default=0)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
            options={
                "ordering": ["order", "-created_at"],
            },
        ),
    ]
