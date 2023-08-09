import styles from './styles.module.css';

type Properties = {
  alt: string;
  src: string | undefined;
  width?: number;
  height?: number;
  defaultColor: string;
};

const BaseImg: React.FC<Properties> = ({
  alt,
  src,
  width = 60,
  height = 60,
  defaultColor,
}) => {
  const style = {
    width: `${width}px`,
    height: `${height}px`,
  };

  const mockStyle = { ...style, backgroundColor: defaultColor };

  return src ? (
    <img className={styles.img} style={style} src={src} alt={alt} />
  ) : (
    <div style={mockStyle} className={styles.mockImg}>
      {alt.length > 0 && alt[0].toUpperCase()}
    </div>
  );
};

export { BaseImg };
