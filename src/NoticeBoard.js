import React from 'react';
import './NoticeBoard.css';

const notices = [
  {
    content: 'This is the Google form for technical seminars',
    link: 'https://forms.gle/vsuTVmZki36VZvmj7',
    deadline: '26th August is the last day',
  },
  {
    content: 'A sections students for IOMP project titles and team members names for Mini-Project',
    link: 'https://forms.gle/bgfuZrZKWxDKnSHS7',
    deadline: '31st August is the last date',
  },
];

const NoticeBoard = () => (
  <div className="container">
    <h1 className="my-4">Notice Board CSM-A</h1>
    <div className="notice-board">
      {notices.map((notice, index) => (
        <div key={index} className="notice">
          <p className="notice-content">{notice.content}</p>
          {notice.link && (
            <p className="notice-link">
              <a href={notice.link} target="_blank" rel="noopener noreferrer">
                {notice.link}
              </a>
            </p>
          )}
          {notice.deadline && (
            <p className="notice-deadline">{notice.deadline}</p>
          )}
        </div>
      ))}
    </div>
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} @Monish KMIT</p>
    </footer>
  </div>
);

export default NoticeBoard;
