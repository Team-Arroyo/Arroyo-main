const s3KeysToOptions = (s3Keys) => {
  return s3Keys.map((key) => ({
      label: key,
      
    }))
}

export default s3KeysToOptions