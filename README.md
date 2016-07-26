# KfMobile
_为这美好的KF献上祝福！_

## 项目简介
本项目为【为这美好的KF献上祝福！】计划第三弹，旨在为广大KFer提供适用于移动浏览器的KF反向代理服务。  
_Present for every KFer!_

## 网址
https://m.miaola.info/

## 环境要求
本项目基于ThinkPHP、phpQuery以及Bootstrap打造，环境要求：

    php >= 5.6.0
    cURL PHP Extension

## 源码下载方式
共分为两种方式：

### 1、直接下载
访问[releases页面](https://github.com/miaolapd/KfMobile/releases)下载最新版的打包文件。

### 2、使用git下载
在适当目录下执行：

    git clone https://github.com/miaolapd/KfMobile.git
以后在项目目录下执行`git pull`即可获取更新。

## 调试
在项目目录下复制一份的`env.debug.php`文件并将其命名为`env.php`即可开启调试模式。

### 编译静态资源文件
在项目目录下执行`npm install`安装依赖包（需安装Node.js）；  
执行`gulp bulid`，可对静态资源文件进行编译；  
执行`gulp watch`，可监视静态资源文件的改动并立即进行编译；

## 部署
删除之前用于调试的`env.php`文件，并在项目目录下复制一份的`env.product.php`文件且将其命名为`env.php`。  
可修改`env.php`文件里的设置，还可增加任何在`application\config.php`文件中你想覆盖的设置。  
每次更新文件后（在非调试模式下），请删除`runtime`目录下的`cache`及`temp`文件夹，以更新模板缓存。

### 虚拟主机配置
网站的入口为`public/index.php`文件，因此请将虚拟主机的root目录设为项目目录下的`public`文件夹。

Nginx虚拟主机配置参考：

    proxy_connect_timeout      20s;
    proxy_read_timeout         60s;
    proxy_send_timeout         60s;
    proxy_buffer_size          32k;
    proxy_buffers              4 64k;
    proxy_busy_buffers_size    128k;
    proxy_temp_file_write_size 512k;
    proxy_temp_path            /var/lib/nginx/proxy;
    proxy_cache_path           /var/lib/nginx/cache levels=1:2 keys_zone=cache_one:100m inactive=1d max_size=5g;
    
    server {
        listen      80;
        listen      [::]:80;
        server_name m.miaola.info;
        root        /var/www/KfMobile/public;
        access_log  /var/log/nginx/m.miaola.info.access.log  combined;
        index       index.php index.html;
    
        location / {
            if (!-e $request_filename) {
                rewrite ^/index.php/(.*)$ /$1 redirect;
                rewrite ^/(.*)$ /index.php?s=$1 last;
                break;
            }
        }
    
        location ^~ /static/ {
            index   index.html;
            expires 7d;
            charset utf-8;
        }
    
        location ~ ^/(ys|js|data|\d+)/ {
            proxy_pass http://www.9moe.com;
    
            proxy_cache_key       'kf_$request_uri';
            proxy_cache           cache_one;
            proxy_cache_valid     200 304 1h;
            proxy_cache_valid     301 302 2h;
            proxy_cache_valid     any 1m;
            proxy_cache_use_stale invalid_header error timeout http_502;
    
            proxy_set_header     Host www.9moe.com;
            proxy_set_header     X-Real-IP $remote_addr;
            proxy_set_header     X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header     Accept-Encoding '';
            proxy_ignore_headers 'Cache-Control' 'Expires';
        }
    
        location ~ ^/(?!index)\w+\.php$ {
            proxy_pass http://www.9moe.com;
            proxy_redirect off;
    
            proxy_set_header Host www.9moe.com;
            proxy_set_header User-Agent $http_user_agent;
            proxy_set_header Referer http://www.9moe.com;
            proxy_set_header Accept-Encoding '';
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    
            subs_filter 'http://www.9moe.com' 'http://$host';
        }
    
        location ~ \.php$ {
            try_files      $uri =404;
            fastcgi_pass   unix:/run/php/php7.0-fpm.sock;
            fastcgi_index  index.php;
            fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
            include        fastcgi_params;
        }
    }

## 讨论帖


## License
[MIT](http://opensource.org/licenses/MIT)
