import datetime
import importlib.util
from pathlib import Path
import unittest
from unittest import mock


MODULE_PATH = (
    Path(__file__).resolve().parents[1]
    / "scripts"
    / "report-writing"
    / "Professional_Emails.py"
)
SPEC = importlib.util.spec_from_file_location("professional_emails", MODULE_PATH)
if SPEC is None or SPEC.loader is None:
    raise RuntimeError(f"Unable to load {MODULE_PATH}")
professional_emails = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(professional_emails)


class FixedDatetime(datetime.datetime):
    @classmethod
    def now(cls, tz=None):
        return cls(2026, 7, 20, tzinfo=tz)


class GenerateEmailDraftTests(unittest.TestCase):
    def test_generates_expected_professional_fields(self):
        with mock.patch.object(
            professional_emails.datetime,
            "datetime",
            FixedDatetime,
        ):
            draft = professional_emails.generate_email_draft(
                "Alex Rivera",
                "alex@example.com",
                "Protective operations update",
                "The advance is complete.",
            )

        self.assertIn("Date: 2026-07-20", draft)
        self.assertIn("To: Alex Rivera <alex@example.com>", draft)
        self.assertIn("Subject: Protective operations update", draft)
        self.assertIn("Dear Alex Rivera,", draft)
        self.assertIn("The advance is complete.", draft)
        self.assertIn("FortiPath Security Team", draft)


if __name__ == "__main__":
    unittest.main()
