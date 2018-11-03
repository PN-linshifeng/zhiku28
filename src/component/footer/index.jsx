import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

export default () => {
  return (
    <div className="container-full footer">
      <div className="link">
        <div className="container">
          <Link title="首页" to="/">
            首页
          </Link>{' '}
          |
          <Link title="关于我们" to="about.html">
            关于我们
          </Link>{' '}
          |
          <Link title="风险提示" to="risk-warning.html">
            风险提示
          </Link>{' '}
          |
          <Link title="免责声明" to="disclaimer.html">
            免责声明
          </Link>{' '}
          |
          <Link title="隐私条款" to="privacy-policy.html">
            隐私条款
          </Link>
        </div>
      </div>
      <div className="copyright">
        <div className="container">
          如有查询，请联系：info@zhiku28.com
          <br />
          风险声明：外汇保证金交易涉及较高风险，可能不适合所有投资者。本网站及在线讲座所包含的内容及观点并不构成任何投资性产品的交易邀请或建议。
          <br />
          本公司不会为任何投资者直接或间接根据这些资料作出的投资决定所造成的损失负责。
          <br />
          ZHIKU28-COPYRIGHT © 2018 保留所有版权
          <br />
        </div>
      </div>
    </div>
  );
};
