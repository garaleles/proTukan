import Iyzipay from 'iyzipay';
//config.json dosyasını JSON türünde içe aktar
import config from '../config/iyzicoConfig.json' assert { type: 'json' };;


const iyzipay = new Iyzipay(config);

export default iyzipay;
