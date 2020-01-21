import css from './index.less';

export default ()=>{
    return (
        <div className={css.User}>
            <div className={css.Avatar}></div>
            <div className={css.Info}>
                <div>LeoooY</div>
                <div>黄金会员</div>
            </div>
        </div>
    )
}