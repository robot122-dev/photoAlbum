# Photo Album Project

## Описание решения

Этот проект представляет собой фотогалерею, которая интегрируется с API Directus. Пользователи могут просматривать альбомы с фотографиями, а администратор может управлять контентом через панель Directus. 

Проект использует следующие технологии:
- **Directus** для управления контентом и хранения файлов.
- **Nginx** для проксирования запросов и статической доставки сайта.
- **Docker** для контейнеризации всех компонентов (сайт, Nginx, Directus).
- **Frontend** реализован на HTML, CSS и JavaScript для отображения данных с API Directus.

## Инструкция по запуску приложения

1. **Клонирование репозитория**
   
   Склонируйте репозиторий на локальный компьютер:
   
-- git clone https://github.com/robot122-dev/photoAlbum.git
   
Запуск Docker контейнеров
Приложение использует Docker и Docker Compose для управления зависимостями. Убедитесь, что Docker установлен на вашем компьютере.

Для запуска контейнеров выполните:

-- cd photoAlbum

-- docker-compose up -d
Доступ к приложению

После запуска вы сможете открыть следующие адреса:

Главная страница сайта: http://localhost:8080
Панель администрирования Directus: http://localhost:8080/directus
Администраторские учетные данные

В системе уже создан администратор с логином и паролем:

- Email: admin@example.com
- Password: d1r3ctu5
Используйте эти данные для входа в панель Directus.

Настройка проекта

Все конфигурации для Directus, Nginx и базы данных уже настроены. При необходимости вы можете изменить переменные окружения в файле docker-compose.yml.
Структура проекта

frontend/ — исходный код сайта.
nginx/ — конфигурация Nginx.
directus/ — конфигурация и данные Directus.
docker-compose.yml — описание сервисов Docker.


Скрины:
![Главный экран](https://github.com/robot122-dev/photoAlbum/blob/master/etc/gitImages/2024-09-10_14-59-01.png)
![Страница альбома](https://github.com/robot122-dev/photoAlbum/blob/master/etc/gitImages/2024-09-10_15-00-19.png)
![Модальное окно](https://github.com/robot122-dev/photoAlbum/blob/master/etc/gitImages/2024-09-10_15-00-54.png)
![Админ меню](https://github.com/robot122-dev/photoAlbum/blob/master/etc/gitImages/2024-09-10_15-01-17.png)
![Работа админ меню](https://github.com/robot122-dev/photoAlbum/blob/master/etc/gitImages/2024-09-10_15-02-03.png)
