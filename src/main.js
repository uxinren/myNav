const $siteList = $('.siteList')
const $lastLi = $('.siteList').find('li.lastLi')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    { logo: 'B', url: 'https://baidu.com' },
    { logo: 'B', url: 'https://bilibili.com' }
]
const simplifyUrl = (url) => {
    return url.replace('http://', '')
        .replace('https://', '')
        .replace('www.', '')
        .replace(/\/.*/,'')//删除/开头的内容
}
const render = () => {
    $siteList.find('li:not(.lastLi)').remove()
    hashMap.forEach((node,index) => {
        const $li = $(`<li>
                <div class="site">
                    <div class="logo">${node.logo[0]}</div>
                    <div class="link">${simplifyUrl(node.url)}</div>
                    <div class="close">
                      <svg class="icon">
                            <use xlink:href="#icon-close"></use>
                      </svg>
                    </div>
                </div>
        </li>`).insertBefore($lastLi);
        $li.on('click',()=>{
            window.open(node.url)
        })
        $li.on('click','.close',(e)=>{
            e.stopPropagation();//阻止冒泡
            hashMap.splice(index, 1);
            render()
        })
    })
}
render()
$('.addButton')
    .on('click', () => {
        let url = window.prompt('请输入你的网址')
        if (url.indexOf('http') !== 0) {
            url = 'https://' + url
        }
        console.log(url)
        hashMap.push({
            logo: simplifyUrl(url)[0],
            url: url
        })
        console.log(hashMap)
        render()
    })

window.onbeforeunload = () => {
    console.log('页面关闭')
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}

$(document).on('keypress',(e)=>{
    const {key} = e
    for (let i = 0; i < hashMap.length; i++) {
        if (key === hashMap[i].logo.toLowerCase()){
            window.open(hashMap[i].url)
        }
    }
})
