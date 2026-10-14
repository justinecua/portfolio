from pathlib import Path

from django.conf import settings
from django.core.files import File
from django.core.management.base import BaseCommand

from core.models import Certificate

# The certificates that used to be hardcoded in the frontend.
CERTIFICATES = [
    {
        "title": "Linux TestDome Certificate",
        "issuer": "TestDome",
        "category": "TestDome",
        "date_label": "July 18, 2026",
        "url": "https://www.testdome.com/certificates/0b3f53d3e6ed45c7a8c30230f3d9de0a",
    },
    {
        "title": "SQL TestDome Certificate",
        "issuer": "TestDome",
        "category": "TestDome",
        "date_label": "July 18, 2026",
        "url": "https://www.testdome.com/certificates/18144616f8274aa0b7b4ddbe4f225d31",
    },
    {
        "title": "3 Day Laravel Framework Training",
        "issuer": "Philippine Society of Information Technology Educators",
        "category": "Backend Development",
        "date_label": "June 24-26, 2026",
        "pdf": "PSIT_Laravel_Cert.pdf",
    },
    {
        "title": "Multimodal AI with Firebase using Gemini with Extensions and GenKit",
        "issuer": "GDG Cagayan de Oro",
        "category": "Backend Development",
        "date_label": "Nov 16, 2024",
        "pdf": "GDG.pdf",
    },
]


class Command(BaseCommand):
    help = "Import the certificates that were previously hardcoded in the frontend."

    def add_arguments(self, parser):
        parser.add_argument(
            "--pdf-dir",
            default=str(
                Path(settings.BASE_DIR).parent / "frontend" / "src" / "assets" / "certificates"
            ),
            help="Folder containing the certificate PDFs.",
        )

    def handle(self, *args, **options):
        pdf_dir = Path(options["pdf_dir"])

        for order, data in enumerate(CERTIFICATES):
            data = dict(data)
            pdf = data.pop("pdf", None)

            if Certificate.objects.filter(title=data["title"]).exists():
                self.stdout.write(f"skip (exists): {data['title']}")
                continue

            cert = Certificate(order=order, **data)
            if pdf:
                path = pdf_dir / pdf
                if not path.exists():
                    self.stderr.write(f"missing PDF, skipped: {path}")
                    continue
                with path.open("rb") as fh:
                    cert.file.save(pdf, File(fh), save=False)
            cert.save()
            self.stdout.write(self.style.SUCCESS(f"added: {data['title']}"))
