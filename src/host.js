let SOCKET_IO_HOST = ''

if (process.env.NODE_ENV !== 'production') {
  SOCKET_IO_HOST = 'http://172.16.4.55:3333'
} else {
  SOCKET_IO_HOST = 'https://hitthemfrogsocket.khariskhasburrahman.com'
}

export default SOCKET_IO_HOST