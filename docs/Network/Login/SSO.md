# SSO 单点登录

单点登录（Single Sign On）其实是一个需求,主要是为了解决一次登录,多系统(本系统或外部系统)之间不需要重复登录的问题,就目前来说,主流的解决方案针对业务场景分为3个方向:

1. 同一公司,同父域下的单点登录解决方案. 如 http://map.baidu.com 和 http://image.baidu.com 都在主域 http://www.baidu.com 。实现技术：cookie开源项目代表: JWT(https://jwt.io/);
2. 同一公司,不同域下的单点登录解决方案. 如 http://www.taobao.com 和 http://www.tmall.com ，实现框架如基于中央认证服务器开源项目代表:CAS [https://github.com/apereo/cas](https://www.apereo.org/projects/cas)
3. 不同公司之间,不同域下的 第三方登录功能实现.  如第三方网站支持qq登录,微信登录,微博登录等; 基于OAuth2.0协议各大公司自己的支持;

[现在用的比较多的单点登录技术是什么？](https://www.zhihu.com/question/342103776)
[单点登录（SSO）看这一篇就够了](https://developer.aliyun.com/article/636281)
[注册登录原理及密码安全问题](https://mp.weixin.qq.com/s/14hwmGURcxEw21m69SHU7Q)
[第三方账号登录的原理二维码](https://mp.weixin.qq.com/s/0MMb9TUb6MFlApP1G8cOsQ)