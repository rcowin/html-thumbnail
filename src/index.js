import React from 'react';
import ReactDOM from 'react-dom';
import html2canvas from 'html2canvas';

const DefaultId = 'HTMLThumbnailPortal-' + Math.ceil(Math.random()*1000000)

function imgLoaded(img){
  return new Promise(r => {
    img.onload = () => r();
    img.complete ? r() : setTimeout(r, 5000)
  })
}

class HTMLThumbnail extends React.Component { 
  constructor(props) {
    super(props);

    this.el = document.createElement('div');
    this.canvasRef = React.createRef();
    this.portalId = props.portalId || DefaultId; 
    this.width = props.width || 158;
  }

  componentDidMount() {
    var el = this.el;
    var canvasRef = this.canvasRef;
    var portalRoot = this.portalRoot = document.getElementById(this.portalId);
    var width = this.width;

    portalRoot.appendChild(this.el);
    var imgs = el.getElementsByTagName('img');

    (async function(){
      for (var img of imgs){
        await imgLoaded(img);
      }

      html2canvas(el, {
        allowTaint: true
      }).then(function(canvas) {
        var oldWidth = parseInt(canvas.style.width)
        var scale = oldWidth / width;
        var oldHeight = parseInt(canvas.style.height)
        canvas.style.width = width + 'px'
        canvas.style.height = Math.floor(oldHeight/scale)  + 'px'
        canvasRef.current.appendChild(canvas);
        portalRoot.removeChild(el);
      });
    })()
  }

  componentWillUnmount() {
    this.portalRoot.removeChild(this.el);
  }

  render() {
    var snapshotContent = ReactDOM.createPortal(
      this.props.children,
      this.el,
    );

    return (
      <div>
       {snapshotContent}
        <div ref={this.canvasRef}/>
      </div>
    )
  }
}

function HTMLThumbnailPortal({id}){
  return (
    <div id={id || DefaultId} style={{position:'absolute', height: 0, overflow: 'hidden', top:0}}/>
  )
}

export {HTMLThumbnail, HTMLThumbnailPortal}