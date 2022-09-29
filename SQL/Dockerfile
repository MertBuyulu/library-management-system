FROM postgres
ENV POSTGRES_USERNAME=postgres
ENV POSTGRES_DB=postgres
ENV POSTGRES_PASSWORD=postgres
COPY create_book.sql /docker-entrypoint-initdb.d/create_book.sql
COPY create_authors.sql /docker-entrypoint-initdb.d/create_authors.sql
COPY create_book_authors.sql /docker-entrypoint-initdb.d/create_book_authors.sql
COPY create_borrowers.sql /docker-entrypoint-initdb.d/create_borrowers.sql
COPY create_book_loans.sql /docker-entrypoint-initdb.d/create_book_loans.sql
COPY create_fines.sql /docker-entrypoint-initdb.d/create_fines.sql
