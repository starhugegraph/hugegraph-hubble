author: huangshiming

```js
beforeChange = (from, to) => {
    console.log(from);
    console.log(to);
}
afterChange = (current) => {
    console.log(current);
}
<Carousel
    style={{width: '800px'}}
    beforeChange={this.beforeChange}
    afterChange={this.afterChange}
>
    <div>
        <img
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract01.jpg' />
    </div>
    <div>
        <img 
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract02.jpg' />
    </div>
    <div>
        <img 
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract03.jpg' />
    </div>
    <div>
        <img
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract01.jpg' />
    </div>
    <div>
        <img 
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract02.jpg' />
    </div>
    <div>
        <img 
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract03.jpg' />
    </div>
    <div>
        <img
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract01.jpg' />
    </div>
    <div>
        <img 
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract02.jpg' />
    </div>
    <div>
        <img 
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract03.jpg' />
    </div>
    <div>
        <img 
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract04.jpg' />
    </div>
    <div>
        <img
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract01.jpg' />
    </div>
    <div>
        <img 
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract02.jpg' />
    </div>
</Carousel>
```

轮播图样式： 多图完整出现，展现N张，切换时候1张切换
```js
<Carousel
    width="880px"
    slidesToScroll={1}
    slidesToShow={3}
>
    <div>
        <img
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract01.jpg' />
    </div>
    <div>
        <img 
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract02.jpg' />
    </div>
    <div>
        <img 
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract03.jpg' />
    </div>
    <div>
        <img
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract01.jpg' />
    </div>
    <div>
        <img 
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract02.jpg' />
    </div>
    <div>
        <img 
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract03.jpg' />
    </div>
    <div>
        <img
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract01.jpg' />
    </div>
    <div>
        <img 
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract02.jpg' />
    </div>
    <div>
        <img 
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract03.jpg' />
    </div>
    <div>
        <img 
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract04.jpg' />
    </div>
    <div>
        <img
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract01.jpg' />
    </div>
    <div>
        <img 
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract02.jpg' />
    </div>
</Carousel>
```

轮播图样式： 多图完整出现，展现N张，切换时候N张一起切换 允许无限循环切换
```js
<Carousel
    width="880px"
    slidesToScroll={3}
    slidesToShow={3}
    infinite={true}
>
    <div>
        <img
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract01.jpg' />
    </div>
    <div>
        <img 
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract02.jpg' />
    </div>
    <div>
        <img 
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract03.jpg' />
    </div>
    <div>
        <img
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract01.jpg' />
    </div>
    <div>
        <img 
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract02.jpg' />
    </div>
    <div>
        <img 
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract03.jpg' />
    </div>
    <div>
        <img
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract01.jpg' />
    </div>
    <div>
        <img 
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract02.jpg' />
    </div>
    <div>
        <img 
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract03.jpg' />
    </div>
    <div>
        <img 
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract04.jpg' />
    </div>
    <div>
        <img
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract01.jpg' />
    </div>
    <div>
        <img 
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract02.jpg' />
    </div>
</Carousel>
```

轮播图样式： 多图完整出现，展现N张，切换时候N张一起切换
```js
<Carousel
    width="880px"
    slidesToScroll={3}
    slidesToShow={3}
>
    <div>
        <img
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract01.jpg' />
    </div>
    <div>
        <img 
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract02.jpg' />
    </div>
    <div>
        <img 
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract03.jpg' />
    </div>
    <div>
        <img
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract01.jpg' />
    </div>
    <div>
        <img 
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract02.jpg' />
    </div>
    <div>
        <img 
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract03.jpg' />
    </div>
    <div>
        <img
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract01.jpg' />
    </div>
    <div>
        <img 
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract02.jpg' />
    </div>
    <div>
        <img 
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract03.jpg' />
    </div>
    <div>
        <img 
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract04.jpg' />
    </div>
    <div>
        <img
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract01.jpg' />
    </div>
    <div>
        <img 
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract02.jpg' />
    </div>
</Carousel>
```

轮播图样式： 多图完整出现，展现N + 0.5张，切换时候N张一起切换
```js
<Carousel
    width="730px"
    slidesToScroll={2}
    slidesToShow={2.5}
>
    <div>
        <img
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract01.jpg' />
    </div>
    <div>
        <img 
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract02.jpg' />
    </div>
    <div>
        <img 
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract03.jpg' />
    </div>
    <div>
        <img
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract01.jpg' />
    </div>
    <div>
        <img 
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract02.jpg' />
    </div>
    <div>
        <img 
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract03.jpg' />
    </div>
    <div>
        <img
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract01.jpg' />
    </div>
    <div>
        <img 
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract02.jpg' />
    </div>
    <div>
        <img 
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract03.jpg' />
    </div>
    <div>
        <img 
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract04.jpg' />
    </div>
    <div>
        <img
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract01.jpg' />
    </div>
    <div>
        <img 
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract02.jpg' />
    </div>
</Carousel>
```

轮播图样式： 多图完整出现，传入N，切换时候N张一起切换 自动循环播放
```js
<Carousel
    width="880px"
    slidesToScroll={3}
    slidesToShow={3}
    infinite={true}
    autoplay={true}
    speed={500}
    autoplaySpeed={500}
>
    <div>
        <img
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract01.jpg' />
    </div>
    <div>
        <img 
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract02.jpg' />
    </div>
    <div>
        <img 
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract03.jpg' />
    </div>
    <div>
        <img
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract01.jpg' />
    </div>
    <div>
        <img 
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract02.jpg' />
    </div>
    <div>
        <img 
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract03.jpg' />
    </div>
    <div>
        <img
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract01.jpg' />
    </div>
    <div>
        <img 
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract02.jpg' />
    </div>
    <div>
        <img 
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract03.jpg' />
    </div>
    <div>
        <img 
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract04.jpg' />
    </div>
    <div>
        <img
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract01.jpg' />
    </div>
    <div>
        <img 
        width={250}
        src='https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract02.jpg' />
    </div>
</Carousel>
```

