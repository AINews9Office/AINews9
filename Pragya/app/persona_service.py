class PersonaService:

    PERSONAS = {

        "Student": [
            "student",
            "school",
            "college",
            "exam",
            "study",
            "learning",
            "homework",
            "assignment"
        ],

        "Teacher": [
            "teacher",
            "educator",
            "class",
            "classroom",
            "teaching",
            "lesson"
        ],

        "Professional": [
            "office",
            "employee",
            "manager",
            "professional",
            "career",
            "job",
            "workplace",
            "company"
        ],

        "Parent": [
            "parent",
            "mother",
            "father",
            "child",
            "kid"
        ],

        "Senior Citizen": [
            "senior",
            "retired",
            "retirement",
            "elderly"
        ],

        "Small Business": [
            "business",
            "shop",
            "startup",
            "entrepreneur",
            "customer"
        ]

    }

    def detect(self, question):

        q = question.lower()

        for persona, keywords in self.PERSONAS.items():

            for keyword in keywords:

                if keyword in q:
                    return persona

        return "General Learner"


persona_service = PersonaService()