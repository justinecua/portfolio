from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0003_conversation_message"),
    ]

    operations = [
        migrations.AddField(
            model_name="project",
            name="thumbnail_file",
            field=models.FileField(blank=True, upload_to="projects/"),
        ),
    ]
