# MATCHA GitHub Pages 上传包

这个目录已经整理成一份可直接上传到远端 GitHub 仓库的静态网站包。

## 目录结构

- `index.html`: GitHub Pages 首页
- `styles.css`: 页面样式
- `script.js`: 页面中的统计、图表和 sample 数据
- `assets/`: 网页直接引用的图片资源
- `materials/images/`: 额外整理出的网页所用图片备份
- `materials/docs/MATCHA_dataset_figure.pdf`: 你要求加入的 PDF 文件
- `materials/text/site-copy.md`: 网页文案备份，方便后续改文案

## 已包含的说明

当前页面已经明确写明：

- 完整数据集不会通过该网站直接分发
- 完整数据集访问需要签署使用协议
- 匿名期内不开放下载和申请
- 匿名期结束后，符合条件的研究者可申请访问
- 网站公开内容仅包含简介、统计、图表和非敏感示例

## 如何上传到 GitHub Pages

1. 新建一个 GitHub 仓库
2. 把这个目录里的全部文件上传到仓库根目录
3. 打开仓库的 `Settings -> Pages`
4. 在 `Build and deployment` 中选择 `Deploy from a branch`
5. 选择 `main` 分支和 `/root`
6. 保存后等待 GitHub 生成站点地址

## 建议保留的文件

建议把下面这些都一起上传：

- `index.html`
- `styles.css`
- `script.js`
- `assets/`
- `materials/`
- `README.md`

## 上传前建议再检查一次

- `index.html` 中的占位联系信息是否要先保留
- 是否还需要补论文链接或匿名仓库链接
- `materials/docs/MATCHA_dataset_figure.pdf` 是否就是你最终想公开的版本
- 网页文案是否都符合当前匿名策略

## 备注

如果你后面想把仓库做得更干净，也可以只保留：

- `index.html`
- `styles.css`
- `script.js`
- `assets/`
- `materials/docs/MATCHA_dataset_figure.pdf`

但我建议先保留完整目录，后续改文案和换图会更方便。
