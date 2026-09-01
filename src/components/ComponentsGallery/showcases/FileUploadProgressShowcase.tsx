import { FileUploadProgress } from '@poliedro/tamentai/web'
import { ShowcaseSection } from '../ShowcaseSection'

export function FileUploadProgressShowcase() {
  return (
    <ShowcaseSection title="Status" description="Estados do ciclo de upload." layout="stack">
      <FileUploadProgress fileName="documento.pdf" fileSize="2 MB" progress={60} status="uploading" />
      <FileUploadProgress fileName="imagem.png" fileSize="512 KB" progress={45} status="paused" />
      <FileUploadProgress fileName="planilha.xlsx" fileSize="1 MB" progress={100} status="success" />
      <FileUploadProgress
        fileName="video.mp4"
        fileSize="20 MB"
        progress={30}
        status="error"
        errorMessage="Falha no envio"
      />
    </ShowcaseSection>
  )
}
