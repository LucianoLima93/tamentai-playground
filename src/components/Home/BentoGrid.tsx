import {
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  ButtonIcon,
  Card,
  Checkbox,
  Input,
  Progress,
  Spinner,
  Switch,
  Tooltip,
} from '@poliedro/tamentai/web'
import { Heart, Star, Download, Search, Bell, Mail } from 'lucide-react'
import styles from './BentoGrid.module.css'

function UserCardBlock() {
  return (
    <div className={`${styles.cell} ${styles.spanCol2} ${styles.spanRow2}`}>
      <span className={styles.cellLabel}>Card + Avatar + Badge</span>
      <div className={styles.cellContent}>
        <Card
          heading={
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Avatar
                src="https://i.pravatar.cc/80?img=12"
                alt="Maria Silva"
                size="lg"
                shape="circular"
              />
              <span>
                <span style={{ fontWeight: 600, display: 'block' }}>Maria Silva</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>Product Designer</span>
              </span>
            </span>
          }
          subtitle="Equipe de Design"
        >
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
            <Badge color="blue" shape="pilled">Design System</Badge>
            <Badge color="green" shape="pilled">React</Badge>
            <Badge color="yellow" shape="pilled">A11y</Badge>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
            <Button variant="solid" size="sm" roundness="round">Seguir</Button>
            <Button variant="outline" size="sm" roundness="round">Mensagem</Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

function ProgressBlock() {
  return (
    <div className={`${styles.cell} ${styles.spanCol2}`}>
      <span className={styles.cellLabel}>Progress</span>
      <div className={styles.cellContent}>
        <Progress value={72} variant="linear" label="Design Tokens" size="md" />
        <Progress value={45} variant="linear" label="Componentes" size="md" />
        <Progress value={90} variant="linear" label="Documentação" size="md" />
      </div>
    </div>
  )
}

function BadgesBlock() {
  return (
    <div className={styles.cell}>
      <span className={styles.cellLabel}>Badges</span>
      <div className={styles.cellContent} style={{ flexDirection: 'row', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'flex-start' }}>
        <Badge color="dark">Dark</Badge>
        <Badge color="gray">Gray</Badge>
        <Badge color="green">Success</Badge>
        <Badge color="blue">Info</Badge>
        <Badge color="red">Error</Badge>
        <Badge color="yellow">Warning</Badge>
        <Badge color="green" shape="pilled">Pilled</Badge>
        <Badge color="blue" shape="pilled">Active</Badge>
      </div>
    </div>
  )
}

function ButtonsBlock() {
  return (
    <div className={styles.cell}>
      <span className={styles.cellLabel}>Buttons</span>
      <div className={styles.cellContent} style={{ gap: '0.75rem' }}>
        <Button variant="solid" size="md" roundness="round" fullWidth>Solid</Button>
        <Button variant="outline" size="md" roundness="round" fullWidth>Outline</Button>
        <Button variant="ghost" size="md" roundness="round" fullWidth>Ghost</Button>
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
          <ButtonIcon aria-label="Favoritar" variant="solid" size="sm">
            <Heart size={14} />
          </ButtonIcon>
          <ButtonIcon aria-label="Estrela" variant="outline" size="sm">
            <Star size={14} />
          </ButtonIcon>
          <ButtonIcon aria-label="Download" variant="ghost" size="sm">
            <Download size={14} />
          </ButtonIcon>
        </div>
      </div>
    </div>
  )
}

function FormBlock() {
  return (
    <div className={`${styles.cell} ${styles.spanCol2}`}>
      <span className={styles.cellLabel}>Form Elements</span>
      <div className={styles.cellContent} style={{ gap: '1rem' }}>
        <Input
          placeholder="Buscar componentes..."
          startIcon={<Search size={16} />}
        />
        <Input
          placeholder="seu@email.com"
          startIcon={<Mail size={16} />}
        />
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Checkbox label="Aceito os termos" />
          <Switch />
        </div>
      </div>
    </div>
  )
}

function AvatarsBlock() {
  return (
    <div className={styles.cell}>
      <span className={styles.cellLabel}>Avatar Group + Tooltip</span>
      <div className={styles.cellContent} style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Tooltip content="Equipe de desenvolvimento">
          <span style={{ display: 'inline-flex' }}>
            <AvatarGroup max={4}>
              <Avatar src="https://i.pravatar.cc/80?img=1" alt="User 1" size="md" shape="circular" />
              <Avatar src="https://i.pravatar.cc/80?img=2" alt="User 2" size="md" shape="circular" />
              <Avatar src="https://i.pravatar.cc/80?img=3" alt="User 3" size="md" shape="circular" />
              <Avatar src="https://i.pravatar.cc/80?img=4" alt="User 4" size="md" shape="circular" />
              <Avatar src="https://i.pravatar.cc/80?img=5" alt="User 5" size="md" shape="circular" />
            </AvatarGroup>
          </span>
        </Tooltip>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
          <Tooltip content="Online">
            <span style={{ display: 'inline-flex' }}>
              <Avatar src="https://i.pravatar.cc/80?img=8" alt="Online" size="sm" shape="circular" />
            </span>
          </Tooltip>
          <Tooltip content="Away">
            <span style={{ display: 'inline-flex' }}>
              <Avatar src="https://i.pravatar.cc/80?img=9" alt="Away" size="sm" shape="circular" />
            </span>
          </Tooltip>
          <Tooltip content="Do Not Disturb">
            <span style={{ display: 'inline-flex' }}>
              <Avatar src="https://i.pravatar.cc/80?img=10" alt="DND" size="sm" shape="circular" />
            </span>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

function SpinnerBlock() {
  return (
    <div className={styles.cell}>
      <span className={styles.cellLabel}>Loading States</span>
      <div className={styles.cellContent} style={{ alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
        <Spinner />
        <Button variant="solid" size="sm" roundness="round" loading>
          Salvando...
        </Button>
        <ButtonIcon aria-label="Notificações" variant="outline" size="md" loading>
          <Bell size={16} />
        </ButtonIcon>
      </div>
    </div>
  )
}

export function BentoGrid() {
  return (
    <section id="components" className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Componentes</h2>
        <p className={styles.sectionSubtitle}>
          Explore os componentes disponíveis, renderizados ao vivo
        </p>
      </div>

      <div className={styles.grid}>
        <UserCardBlock />
        <BadgesBlock />
        <ButtonsBlock />
        <ProgressBlock />
        <FormBlock />
        <AvatarsBlock />
        <SpinnerBlock />
      </div>
    </section>
  )
}
