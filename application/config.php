<?php
return [
    // +----------------------------------------------------------------------
    // | 基本设置
    // +----------------------------------------------------------------------

    // 应用版本号
    'app_version' => '0.8 alpha',
    // 反向代理目标域名的url
    'proxy_base_url' => 'http://www.9moe.com/',
    // 反向代理在尝试连接时的超时时间（秒)
    'proxy_connection_timeout' => 15,
    // 反向代理执行的超时时间（秒)
    'proxy_timeout' => 25,
    // 网站名称
    'site_name' => '绯月Galgame',
    // 电脑版的url
    'pc_version_base_url' => 'https://kf.miaola.info/',
    // 静态资源目录的路径
    'static_path' => 'static/dist/',
    // 是否使用CDN传输部分静态资源文件（如jquery.js、bootstrap.js）
    'static_file_cdn' => false,
    // 静态资源文件时间戳
    'static_file_timestamp' => '',
    // KF cookie的前缀
    'kf_cookie_prefix' => '2ed4e_',
    // 本站编码
    'site_encoding' => 'utf-8',
    // 远端网站编码
    'remote_site_encoding' => 'gbk',
    // 成功提示信息的等待时间
    'success_msg_wait' => 5,
    // 是否关闭网站
    'site_close' => false,
    // 关闭网站的提示消息
    'site_close_msg' => '网站维护中……',
    // 登录页面提示信息
    'login_page_msg' => '<a class="alert-link" href="http://bbs.2dkf.com/read.php?tid=564787" target="_blank">KfMobile项目</a>为喵拉布丁所开发' .
        '的适用于<b>移动浏览器</b>的KF反向代理服务（尚在开发中）。<br>本站(miaola.info)是由喵拉布丁所搭建的<b>非官方</b>的反向代理服务网站，' .
        '如对本站的隐私安全方面抱有疑问，请勿继续访问。',
    // 网站统计脚本
    'stat_script' => '',
    // 游戏介绍图片域名的url
    'game_intro_base_url' => 'http://www.9gal.com/',
    // 缩略图缓存目录
    'thumb_cache_path' => RUNTIME_PATH . 'thumb/',
    // 缩略图最大宽度
    'thumb_max_width' => 360,
    // 缩略图最大高度
    'thumb_max_height' => 203,

    // +----------------------------------------------------------------------
    // | 应用设置
    // +----------------------------------------------------------------------

    // 应用命名空间
    'app_namespace' => 'app',
    // 应用调试模式
    'app_debug' => false,
    // 应用Trace
    'app_trace' => false,
    // 应用模式状态
    'app_status' => '',
    // 是否支持多模块
    'app_multi_module' => false,
    // 注册的根命名空间
    'root_namespace' => [],
    // 扩展配置文件
    'extra_config_list' => [],
    // 扩展函数文件
    'extra_file_list' => [THINK_PATH . 'helper' . EXT],
    // 默认输出类型
    'default_return_type' => 'html',
    // 默认AJAX 数据返回格式,可选json xml ...
    'default_ajax_return' => 'json',
    // 默认JSONP格式返回的处理方法
    'default_jsonp_handler' => 'jsonpReturn',
    // 默认JSONP处理方法
    'var_jsonp_handler' => 'callback',
    // 默认时区
    'default_timezone' => 'PRC',
    // 是否开启多语言
    'lang_switch_on' => false,
    // 默认全局过滤方法 用逗号分隔多个
    'default_filter' => '',
    // 默认语言
    'default_lang' => 'zh-cn',
    // 是否启用控制器类后缀
    'controller_suffix' => false,

    // +----------------------------------------------------------------------
    // | 模块设置
    // +----------------------------------------------------------------------

    // 默认模块名
    'default_module' => 'index',
    // 禁止访问模块
    'deny_module_list' => ['common'],
    // 默认控制器名
    'default_controller' => 'Index',
    // 默认操作名
    'default_action' => 'index',
    // 默认验证器
    'default_validate' => '',
    // 默认的空控制器名
    'empty_controller' => 'Error',
    // 操作方法后缀
    'action_suffix' => '',
    // 自动搜索控制器
    'controller_auto_search' => false,

    // +----------------------------------------------------------------------
    // | URL设置
    // +----------------------------------------------------------------------

    // PATHINFO变量名 用于兼容模式
    'var_pathinfo' => 's',
    // 兼容PATH_INFO获取
    'pathinfo_fetch' => ['ORIG_PATH_INFO', 'REDIRECT_PATH_INFO', 'REDIRECT_URL'],
    // pathinfo分隔符
    'pathinfo_depr' => '/',
    // URL伪静态后缀
    'url_html_suffix' => '',
    // URL普通方式参数 用于自动生成
    'url_common_param' => false,
    // URL参数方式 0 按名称成对解析 1 按顺序解析
    'url_param_type' => 0,
    // 是否开启路由
    'url_route_on' => true,
    // 是否强制使用路由
    'url_route_must' => false,
    // 域名部署
    'url_domain_deploy' => false,
    // 域名根，如.thinkphp.cn
    'url_domain_root' => '',
    // 是否自动转换URL中的控制器和操作名
    'url_convert' => true,
    // 默认的访问控制器层
    'url_controller_layer' => 'controller',
    // 表单请求类型伪装变量
    'var_method' => '_method',

    // +----------------------------------------------------------------------
    // | 模板设置
    // +----------------------------------------------------------------------

    'template' => [
        // 模板引擎类型 支持 php think 支持扩展
        'type' => 'Think',
        // 模板路径
        'view_path' => '',
        // 模板后缀
        'view_suffix' => 'html',
        // 模板文件名分隔符
        'view_depr' => DS,
        // 模板引擎普通标签开始标记
        'tpl_begin' => '{',
        // 模板引擎普通标签结束标记
        'tpl_end' => '}',
        // 标签库标签开始标记
        'taglib_begin' => '{',
        // 标签库标签结束标记
        'taglib_end' => '}',
    ],

    // 视图输出字符串内容替换
    'view_replace_str' => [
        '__PUBLIC__' => PUBLIC_PATH,
    ],
    // 默认跳转页面对应的模板文件
    'dispatch_success_tmpl' => THINK_PATH . 'tpl' . DS . 'dispatch_jump.tpl',
    'dispatch_error_tmpl' => THINK_PATH . 'tpl' . DS . 'dispatch_jump.tpl',

    // +----------------------------------------------------------------------
    // | 异常及错误设置
    // +----------------------------------------------------------------------

    // 异常页面的模板文件
    'exception_tmpl' => THINK_PATH . 'tpl' . DS . 'think_exception.tpl',

    // 错误显示信息,非调试模式有效
    'error_message' => '页面错误！请稍后再试~~',
    // 显示错误信息
    'show_error_msg' => false,
    // 异常处理handle类 留空使用 \think\exception\Handle
    'exception_handle' => '',

    // +----------------------------------------------------------------------
    // | 日志设置
    // +----------------------------------------------------------------------

    'log' => [
        // 日志记录方式，支持 file socket
        'type' => 'File',
        // 日志保存目录
        'path' => LOG_PATH,
    ],

    // +----------------------------------------------------------------------
    // | Trace设置
    // +----------------------------------------------------------------------

    'trace' => [
        //支持Html Console
        'type' => 'Html',
    ],

    // +----------------------------------------------------------------------
    // | 缓存设置
    // +----------------------------------------------------------------------

    'cache' => [
        // 驱动方式
        'type' => 'File',
        // 缓存保存目录
        'path' => CACHE_PATH,
        // 缓存前缀
        'prefix' => '',
        // 缓存有效期 0表示永久缓存
        'expire' => 0,
    ],

    // +----------------------------------------------------------------------
    // | 会话设置
    // +----------------------------------------------------------------------

    'session' => [
        'id' => '',
        // SESSION_ID的提交变量,解决flash上传跨域
        'var_session_id' => '',
        // SESSION 前缀
        'prefix' => 'kf',
        // 驱动方式 支持redis memcache memcached
        'type' => '',
        // 是否自动开启 SESSION
        'auto_start' => true,
    ],

    // +----------------------------------------------------------------------
    // | Cookie设置
    // +----------------------------------------------------------------------
    'cookie' => [
        // cookie 名称前缀
        'prefix' => 'kf_',
        // cookie 保存时间
        'expire' => 0,
        // cookie 保存路径
        'path' => '/',
        // cookie 有效域名
        'domain' => '',
        //  cookie 启用安全传输
        'secure' => false,
        // httponly设置
        'httponly' => '',
        // 是否使用 setcookie
        'setcookie' => true,
    ],

    //分页配置
    'paginate' => [
        'type' => 'bootstrap',
        'var_page' => 'page',
        'list_rows' => 15,
    ],
];
