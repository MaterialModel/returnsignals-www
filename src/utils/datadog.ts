import { datadogRum } from '@datadog/browser-rum'
import { datadogLogs } from '@datadog/browser-logs'

export function initializeDatadog(): void {
  const applicationId = import.meta.env.PUBLIC_DATADOG_APPLICATION_ID
  const clientToken = import.meta.env.PUBLIC_DATADOG_CLIENT_TOKEN
  const site = import.meta.env.PUBLIC_DATADOG_SITE || 'us3.datadoghq.com'
  const service = import.meta.env.PUBLIC_DATADOG_SERVICE || 'returnsignals-www'
  const env = import.meta.env.PUBLIC_DATADOG_ENV || 'production'
  const version = import.meta.env.PUBLIC_BUILD_VERSION || 'unknown'

  if (!applicationId || !clientToken) {
    return
  }

  // Initialize RUM
  datadogRum.init({
    applicationId,
    clientToken,
    site,
    service,
    env,
    version,
    sessionSampleRate: 100,
    sessionReplaySampleRate: 20,
    trackUserInteractions: true,
    trackResources: true,
    trackLongTasks: true,
    defaultPrivacyLevel: 'mask-user-input',
  })

  // Initialize Logs
  datadogLogs.init({
    clientToken,
    site,
    service,
    env,
    version,
    forwardErrorsToLogs: true,
    sessionSampleRate: 100,
  })
}
