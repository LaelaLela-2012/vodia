
import styled from 'styled-components';
   
export const Box = styled.div`
padding: 80px 0;
background: #000;
position: relative;
width: 100%;
margin-top: 1rem;
bottom: 0;
left: 0;
@media (max-width: 400px) {
  padding: 80px 50px;
}
@media (max-width: 500px) {
  padding: 80px;
}
@media (max-width: 920px) {
  padding: 80px 60px;
}
`;
   
export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 900px;
    margin: 0 auto;
`
   
export const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 0;
`;
   
export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 
                         minmax(185px, 1fr));
  grid-gap: 50px;
   
  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fill, 
                           minmax(200px, 1fr));
  }
`;
   
export const FooterLink = styled.a`
margin-bottom: 10px;
font-size: 13px;
color: grey;
text-decoration: none;
   
  &:hover {
      transition: 200ms ease-in;
      text-decoration: underline;
  }
`;
   
export const Heading = styled.p`
  font-size: 24px;
  color: #fff;
  margin-bottom: 40px;
  font-weight: bold;
`;