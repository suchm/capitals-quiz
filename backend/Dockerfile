# ============================================
# Stage 1: Build Laravel App
# ============================================
FROM php:8.3-fpm-alpine as build

# Install system dependencies and PHP extensions
RUN apk add --no-cache \
    zip \
    libzip-dev \
    freetype \
    libjpeg-turbo \
    libpng \
    freetype-dev \
    libjpeg-turbo-dev \
    libpng-dev \
    && docker-php-ext-configure zip \
    && docker-php-ext-install zip pdo pdo_mysql \
    && docker-php-ext-configure gd --with-freetype=/usr/include/ --with-jpeg=/usr/include/ \
    && docker-php-ext-install -j$(nproc) gd \
    && docker-php-ext-enable gd

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app/backend

# Copy Laravel project files
COPY . .

# Set correct permissions
RUN chown -R www-data:www-data /app/backend \
    && chmod -R 775 /app/backend/storage \
    && chmod -R 775 /app/backend/bootstrap/cache

# Install PHP dependencies
RUN composer install --no-dev --prefer-dist

# ============================================
# Stage 2: Production - Run Laravel with Nginx + PHP-FPM
# ============================================
FROM php:8.3-fpm-alpine

# Install system dependencies and PHP extensions
RUN apk add --no-cache \
    zip \
    libzip-dev \
    freetype \
    libjpeg-turbo \
    libpng \
    freetype-dev \
    libjpeg-turbo-dev \
    libpng-dev \
    oniguruma-dev \
    gettext-dev \
    nginx \
    && docker-php-ext-configure zip \
    && docker-php-ext-install zip pdo pdo_mysql \
    && docker-php-ext-configure gd --with-freetype=/usr/include/ --with-jpeg=/usr/include/ \
    && docker-php-ext-install -j$(nproc) gd \
    && docker-php-ext-enable gd \
    && docker-php-ext-install bcmath \
    && docker-php-ext-enable bcmath \
    && docker-php-ext-install exif \
    && docker-php-ext-enable exif \
    && docker-php-ext-install gettext \
    && docker-php-ext-enable gettext \
    && docker-php-ext-install opcache \
    && docker-php-ext-enable opcache \
    && rm -rf /var/cache/apk/*

WORKDIR /app/backend

# Copy built Laravel app from the build stage
COPY --from=build /app/backend /app/backend

# Copy Nginx and PHP config files
COPY ./docker/nginx/nginx.conf /etc/nginx/http.d/default.conf
COPY ./docker/php/local.ini "$PHP_INI_DIR/conf.d/app.ini"

# Set correct permissions for Laravel
RUN chown -R www-data:www-data /app/backend \
    && chmod -R 775 /app/backend/storage \
    && chmod -R 775 /app/backend/bootstrap/cache

# Expose ports for Nginx and PHP-FPM
EXPOSE 80

# Define volumes for persistent storage (important for Laravel sessions & cache)
VOLUME ["/app/backend/storage", "/app/backend/bootstrap/cache"]

# Start both Nginx and PHP-FPM in the foreground
CMD ["sh", "-c", "nginx -g 'daemon off;' & php-fpm"]
