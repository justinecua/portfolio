from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0004_project_thumbnail_file"),
    ]

    operations = [
        migrations.AddField(
            model_name="project",
            name="logo_file",
            field=models.FileField(blank=True, upload_to="projects/logos/"),
        ),
    ]
