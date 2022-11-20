# Проєктування бази даних

## Модель бізнес-обʼєктів

@startuml

entity User
entity User.ID
entity User.email
entity User.password

entity Quiz
entity Quiz.ID
entity Quiz.text
entity Quiz.userID
entity Quiz.questions

entity Question
entity Question.ID
entity Question.text
entity Question.quizID

User *-- User.ID
User *-- User.email
User *-- User.password

Quiz *-- Quiz.ID
Quiz *-- Quiz.text
Quiz *-- Quiz.userID
Quiz *-- Quiz.questions

Question *-- Question.ID
Question *-- Question.text
Question *-- Question.quizID

User.ID *-- Quiz.userID
Quiz.ID *-- Question.quizID

Question --- Quiz

@enduml

## ER-модель

@startuml

entity Users <<ENTITY>> {
	id:INT
	email:VARCHAR
	password:VARCHAR
}

entity Quiz <<ENTITY>> {
	id:INT
	name:VARCHAR
	userID:INT
}

entity Questions <<ENTITY>> {
	id:INT
	text:VARCHAR
	quizID:INT
}

entity Answers <<ENTITY>> {
	id:INT
	text:VARCHAR
	questionID:INT
  correct:BOOLEAN
}

entity Results <<ENTITY>> {
	id:INT
	email:VARCHAR
	quizID:INT
  nbCorrect:INT
  nbTotal:INT
}

Quiz "1, 1"---"0, *" Users
Answers "0, 1"---"1, *" Questions
Questions "1, *"---"1, *" Quiz
Quiz "0, *"---"1, 1" Results

@enduml
