import React from 'react';
import ReactDOM from 'react-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import "./embed.css";

class Embed extends React.PureComponent {
    state = {value: `<iframe width="560" src='https://vodia.id/embed/${window.location.href.split("/")[4]}' title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`, copied: false};
  
    onChange = ({target: {value}}) => {
      this.setState({value, copied: false});
    };
  
    onClick = ({target: {innerHTML}}) => {
      console.log(`Clicked on "${innerHTML}"!`); // eslint-disable-line
    };
  
    onCopy = () => {
      this.setState({copied: true});
    };

    render() {
      return (
        <div>
          <section className="section">
            <textarea className='embedLink' onChange={this.onChange} value={this.state.value} />
          </section>
  
          <section className="section">
            <CopyToClipboard onCopy={this.onCopy} text={this.state.value}>
              <button className='Copy'  style={{ padding: '10px 20px', position: 'inherit', border: '1px solid #ddd', width: '100px', textAlign: 'center', justifyContent: 'center', cursor: 'pointer', display: 'flex', lineHeight: '0.5rem', borderRadius: '5px', margin: '5px 0' }}>Copy</button>
             </CopyToClipboard>
          </section>
          <section className="section">
            {this.state.copied ? <span style={{color: 'red', margin: '5px 20px', right: '0', position: 'absolute',bottom: '10px'}}>Copied!</span> : null}
          </section>
          
        </div>
      );
    }
  }
  
  const appRoot = document.createElement('div');
  ReactDOM.render(<Embed />, appRoot);

  export default Embed;