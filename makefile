dev:
	docker compose up api db-producao -d

test:
	docker compose up db-producao-test -d

stop_dev:
	docker compose stop api db-producao

stop_test:
	docker compose stop db-producao-test

bash_dev:
	docker exec -it projeto-lanchonete-producao-api-1 sh
