from datetime import datetime


class MemoryService:

    def __init__(self):

        self.sessions = {}

    def create_session(self, session_id, first_question):

        if session_id not in self.sessions:

            self.sessions[session_id] = {
                "title": first_question[:60],
                "created_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                "updated_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                "messages": []
            }

    def get_history(self, session_id):

        if session_id not in self.sessions:
            return []

        return self.sessions[session_id]["messages"]

    def add_message(self, session_id, role, content):

        if session_id not in self.sessions:
            self.create_session(session_id, content)

        self.sessions[session_id]["messages"].append(
            {
                "role": role,
                "content": content,
                "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            }
        )

        self.sessions[session_id]["updated_at"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        self.sessions[session_id]["messages"] = self.sessions[session_id]["messages"][-20:]

    def get_sessions(self):

        sessions = []

        for session_id, session in self.sessions.items():

            sessions.append(
                {
                    "session_id": session_id,
                    "title": session["title"],
                    "created_at": session["created_at"],
                    "updated_at": session["updated_at"],
                    "message_count": len(session["messages"])
                }
            )

        sessions.sort(key=lambda x: x["updated_at"], reverse=True)

        return sessions

    def delete_session(self, session_id):

        if session_id in self.sessions:
            del self.sessions[session_id]


memory_service = MemoryService()