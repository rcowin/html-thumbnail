# htmlthumbnail
 React component to create and render thumbnails from html.

 Relies heavily on https://github.com/niklasvh/html2canvas for all the heavy lifting.

Simply add a `HTMLThumbnailPortal` component to the portion of your DOM that will render the thumbnail content correctly.

```
  <MainView>
    <PageView page={page}/>
    <HTMLThumbnailPortal/>
  </MainView>
```

Then include `HTMLThumbnail` where you need the thumbnail and include the component to render the thumbnail from as a child.

```
  <div className="navItemContent">
    <HTMLThumbnail>
        <PageView page={page}/>
    </HTMLThumbnail>
  </div>
```

