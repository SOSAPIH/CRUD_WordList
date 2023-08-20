import { Link } from 'react-router-dom';

export default function Header() {

  return (
    <div className="header">
      <h1>
        <Link to="/">토익 영단어(고급)</Link>
      </h1>
      <div className="menu">
        <Link to="/create_word" className="link" style={{fontSize: '1.2rem'}}>
          단어 추가
        </Link> | &nbsp;
        <Link to="/create_day" className="link" style={{fontSize: '1.2rem'}}>
          Day 추가
        </Link> | &nbsp;
        <Link to='/delete_day' className='link' style={{ fontSize: '1.2rem' }}>
          Day 삭제
        </Link>  
      </div>
    </div>
  )
}