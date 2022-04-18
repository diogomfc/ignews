import styles from './styles.module.scss'

interface SubscriberButtonProps {
  priceId: string;
}

export function SubscriberButton({ priceId }: SubscriberButtonProps) {
  return (
    <button
      className={styles.buttonContainer}
      type='button'>
      Subscribe now
    </button>
  )
}