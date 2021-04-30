// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //

import { on } from '../typescript';

describe('EventMap', () => {

	test('HTMLMediaElement => HTMLMediaElementEventMap', () => {
		const target = self.document.createElement('video');

		on(target, 'encrypted', function (this, event) {
			expect(this).toBeInstanceOf(HTMLMediaElement);
			expect(event).toBeInstanceOf(MediaEncryptedEvent);
		});
	});

	test('HTMLElement => HTMLElementEventMap', () => {
		const target = self.document.createElement('div');

		on(target, 'pointerdown', function (this, event) {
			expect(this).toBeInstanceOf(HTMLElement);
			expect(event).toBeInstanceOf(PointerEvent);
		});
	});

	test('SVGSVGElement => SVGElementEventMap', () => {
		const target = self.document.createElementNS('http://www.w3.org/2000/svg', 'svg');

		on(target, 'SVGZoom', function (this, event) {
			expect(this).toBeInstanceOf(SVGSVGElement);
			expect(event).toBeInstanceOf(SVGZoomEvent);
		});
	});

	test('SVGElement => SVGElementEventMap', () => {
		const target = self.document.createElementNS('http://www.w3.org/2000/svg', 'g');

		on(target, 'copy', function (this, event) {
			expect(this).toBeInstanceOf(SVGElement);
			expect(event).toBeInstanceOf(ClipboardEvent);
		}, {
			once: true
		});
	});

	test('Element => ElementEventMap', () => {
		class Test extends Element { }
		const target = new Test();

		on(target, 'fullscreenerror', function (this, event) {
			expect(this).toBeInstanceOf(Element);
			expect(event).toBeInstanceOf(Event);
		});
	});

	test('Document => DocumentEventMap', () => {
		const target = self.document;

		on(target, 'readystatechange', function (this, event) {
			expect(this).toBeInstanceOf(Document);
			expect(event).toBeInstanceOf(Event);
		});
	});

	test('Window => WindowEventMap', () => {
		const target = self.window;

		on(target, 'deviceorientationabsolute', function (this, event) {
			expect(this).toBeInstanceOf(Window);
			expect(event).toBeInstanceOf(DeviceOrientationEvent);
		});
	});

	test('AudioScheduledSourceNode => AudioScheduledSourceNodeEventMap', () => {
		const target = new AudioContext().createOscillator();

		on(target, 'ended', function (this, event) {
			expect(this).toBeInstanceOf(AudioScheduledSourceNode);
			expect(event).toBeInstanceOf(Event);
		});
	});

	test('AudioWorkletNode => AudioWorkletNodeEventMap', () => {
		const target = new AudioWorkletNode(new AudioContext(), 'test');

		on(target, 'processorerror', function (this, event) {
			expect(this).toBeInstanceOf(AudioWorkletNode);
			expect(event).toBeInstanceOf(Event);
		});
	});

	test('OfflineAudioContext => OfflineAudioContextEventMap', () => {
		const target = new OfflineAudioContext(2, 44100 * 40, 44100);

		on(target, 'complete', function (this, event) {
			expect(this).toBeInstanceOf(OfflineAudioContext);
			expect(event).toBeInstanceOf(OfflineAudioCompletionEvent);
		});
	});

	test('IDBOpenDBRequest => IDBOpenDBRequestEventMap', () => {
		const target = window.indexedDB.open('test', 4);

		on(target, 'upgradeneeded', function (this, event) {
			expect(this).toBeInstanceOf(IDBOpenDBRequest);
			expect(event).toBeInstanceOf(IDBVersionChangeEvent);
		});
	});

	test('RTCIceGatherer => RTCIceGathererEventMap', () => {
		const target = new RTCIceGatherer({ });

		on(target, 'localcandidate', function (this, event) {
			expect(this).toBeInstanceOf(RTCIceGatherer);
			expect(event).toBeInstanceOf(RTCIceGathererEvent);
		});
	});

	test('XMLHttpRequest => XMLHttpRequestEventMap', () => {
		const target = new XMLHttpRequest();

		on(target, 'readystatechange', function (this, event) {
			expect(this).toBeInstanceOf(XMLHttpRequest);
			expect(event).toBeInstanceOf(Event);
		});
	});

	test('ServiceWorker => ServiceWorkerEventMap', () => {
		const target = new ServiceWorker();

		on(target, 'statechange', function (this, event) {
			expect(this).toBeInstanceOf(ServiceWorker);
			expect(event).toBeInstanceOf(Event);
		});
	});

	test('Worker => WorkerEventMap', () => {
		const target = new Worker('test');

		on(target, 'messageerror', function (this, event) {
			expect(this).toBeInstanceOf(Worker);
			expect(event).toBeInstanceOf(MessageEvent);
		});
	});

	test('AbortSignal => AbortSignalEventMap', () => {
		const target = new AbortController().signal;

		on(target, 'abort', function (this, event) {
			expect(this).toBeInstanceOf(AbortSignal);
			expect(event).toBeInstanceOf(Event);
		});
	});

	test('Animation => AnimationEventMap', () => {
		const node = self.document.createElement('div');
		const effect = new KeyframeEffect(node, [
			{ transform: 'translateY(0%)' },
			{ transform: 'translateY(100%)' }
		], { duration: 3000, fill: 'forwards' });
		const target = new Animation(effect, self.document.timeline);

		on(target, 'finish', function (this, event) {
			expect(this).toBeInstanceOf(Animation);
			expect(event).toBeInstanceOf(AnimationPlaybackEvent);
		});
	});

	test('BaseAudioContext => BaseAudioContextEventMap', () => {
		const target = new AudioContext();

		on(target, 'statechange', function (this, event) {
			expect(this).toBeInstanceOf(BaseAudioContext);
			expect(event).toBeInstanceOf(Event);
		});
	});

	test('BroadcastChannel => BroadcastChannelEventMap', () => {
		const target = new BroadcastChannel('internal_notification');

		on(target, 'messageerror', function (this, event) {
			expect(this).toBeInstanceOf(BroadcastChannel);
			expect(event).toBeInstanceOf(MessageEvent);
		});
	});

	test('EventSource => EventSourceEventMap', () => {
		const target = new EventSource('test');

		on(target, 'message', function (this, event) {
			expect(this).toBeInstanceOf(EventSource);
			expect(event).toBeInstanceOf(MessageEvent);
		});
	});

	test('FileReader => FileReaderEventMap', () => {
		const target = new FileReader();

		on(target, 'loadstart', function (this, event) {
			expect(this).toBeInstanceOf(FileReader);
			expect(event).toBeInstanceOf(ProgressEvent);
		});
	});

	test('IDBDatabase => IDBDatabaseEventMap', () => {
		const target = window.indexedDB.open('test', 4).result;

		on(target, 'versionchange', function (this, event) {
			expect(this).toBeInstanceOf(IDBDatabase);
			expect(event).toBeInstanceOf(IDBVersionChangeEvent);
		});
	});

	test('IDBRequest => IDBRequestEventMap', () => {
		const target = window.indexedDB.open('test', 4).result.transaction(['test']).objectStore('test').index('test').count();

		on(target, 'error', function (this, event) {
			expect(this).toBeInstanceOf(IDBRequest);
			expect(event).toBeInstanceOf(Event);
		});
	});

	test('IDBTransaction => IDBTransactionEventMap', () => {
		const target = window.indexedDB.open('test', 4).result.transaction(['test']);

		on(target, 'complete', function (this, event) {
			expect(this).toBeInstanceOf(IDBTransaction);
			expect(event).toBeInstanceOf(Event);
		});
	});

	test('MediaDevices => MediaDevicesEventMap', () => {
		const target = self.navigator.mediaDevices;

		on(target, 'devicechange', function (this, event) {
			expect(this).toBeInstanceOf(MediaDevices);
			expect(event).toBeInstanceOf(Event);
		});
	});

	test('MediaKeySession => MediaKeySessionEventMap', () => {
		const target = new MediaKeySession();

		on(target, 'message', function (this, event) {
			expect(this).toBeInstanceOf(MediaKeySession);
			expect(event).toBeInstanceOf(Event);
		});
	});

	test('MediaQueryList => MediaQueryListEventMap', () => {
		const target = window.matchMedia('(max-width: 600px)');

		on(target, 'change', function (this, event) {
			expect(this).toBeInstanceOf(MediaQueryList);
			expect(event).toBeInstanceOf(MediaQueryListEvent);
		});
	});

	test('MediaSource => MediaSourceEventMap', () => {
		const target = new MediaSource();

		on(target, 'sourceended', function (this, event) {
			expect(this).toBeInstanceOf(MediaSource);
			expect(event).toBeInstanceOf(Event);
		});
	});

	test('MediaStream => MediaStreamEventMap', () => {
		const target = new MediaStream();

		on(target, 'addtrack', function (this, event) {
			expect(this).toBeInstanceOf(MediaStream);
			expect(event).toBeInstanceOf(MediaStreamTrackEvent);
		});
	});

	test('MediaStreamTrack => MediaStreamTrackEventMap', () => {
		const target = new MediaStream().getTrackById('test');

		if (target) {
			on(target, 'isolationchange', function (this, event) {
				expect(this).toBeInstanceOf(MediaStreamTrack);
				expect(event).toBeInstanceOf(Event);
			});
		}
	});

	test('MessagePort => MessagePortEventMap', () => {
		const target = new MessageChannel().port1;

		on(target, 'messageerror', function (this, event) {
			expect(this).toBeInstanceOf(MessagePort);
			expect(event).toBeInstanceOf(MessageEvent);
		});
	});

	test('Notification => NotificationEventMap', () => {
		const target = new Notification('test');

		on(target, 'show', function (this, event) {
			expect(this).toBeInstanceOf(Notification);
			expect(event).toBeInstanceOf(Event);
		});
	});

	test('PaymentRequest => PaymentRequestEventMap', () => {
		const target = new PaymentRequest([], {
			total: {
				label: 'Donation',
				amount: {
					currency: 'USD',
					value: '65.00'
				}
			}
		});

		on(target, 'shippingaddresschange', function (this, event) {
			expect(this).toBeInstanceOf(PaymentRequest);
			expect(event).toBeInstanceOf(Event);
		});
	});

	test('Performance => PerformanceEventMap', () => {
		const target = self.performance;

		on(target, 'resourcetimingbufferfull', function (this, event) {
			expect(this).toBeInstanceOf(Performance);
			expect(event).toBeInstanceOf(Event);
		});
	});

	test('PermissionStatus => PermissionStatusEventMap', () => {
		self.navigator.permissions.query({ name: 'geolocation' }).then((target) => {

			on(target, 'change', function (this, event) {
				expect(this).toBeInstanceOf(PermissionStatus);
				expect(event).toBeInstanceOf(Event);
			});

		});
	});

	test('RTCDTMFSender => RTCDTMFSenderEventMap', () => {
		const target = new RTCDTMFSender();

		on(target, 'tonechange', function (this, event) {
			expect(this).toBeInstanceOf(PermissionStatus);
			expect(event).toBeInstanceOf(RTCDTMFToneChangeEvent);
		});
	});

	test('RTCDataChannel => RTCDataChannelEventMap', () => {
		const target = new RTCPeerConnection().createDataChannel('test');

		on(target, 'error', function (this, event) {
			expect(this).toBeInstanceOf(RTCDataChannel);
			expect(event).toBeInstanceOf(RTCErrorEvent);
		});
	});

	test('RTCDtlsTransport => RTCDtlsTransportEventMap', () => {
		const target = new RTCDtlsTransport();

		on(target, 'error', function (this, event) {
			expect(this).toBeInstanceOf(RTCDtlsTransport);
			expect(event).toBeInstanceOf(RTCErrorEvent);
		});
	});

	test('RTCIceTransport => RTCIceTransportEventMap', () => {
		const target = new RTCIceTransport();

		on(target, 'gatheringstatechange', function (this, event) {
			expect(this).toBeInstanceOf(RTCIceTransport);
			expect(event).toBeInstanceOf(Event);
		});
	});

	test('RTCPeerConnection => RTCPeerConnectionEventMap', () => {
		const target = new RTCPeerConnection();

		on(target, 'icecandidateerror', function (this, event) {
			expect(this).toBeInstanceOf(RTCPeerConnection);
			expect(event).toBeInstanceOf(RTCPeerConnectionIceErrorEvent);
		});
	});

	test('RTCSctpTransport => RTCSctpTransportEventMap', () => {
		const target = new RTCSctpTransport();

		on(target, 'statechange', function (this, event) {
			expect(this).toBeInstanceOf(RTCSctpTransport);
			expect(event).toBeInstanceOf(Event);
		});
	});

	test('RTCSrtpSdesTransport => RTCSrtpSdesTransportEventMap', () => {
		const target = new RTCSrtpSdesTransport(new RTCIceTransport(), {}, {});

		on(target, 'error', function (this, event) {
			expect(this).toBeInstanceOf(RTCSrtpSdesTransport);
			expect(event).toBeInstanceOf(Event);
		});
	});

	test('ScreenOrientation => ScreenOrientationEventMap', () => {
		const target = self.screen.orientation;

		on(target, 'change', function (this, event) {
			expect(this).toBeInstanceOf(ScreenOrientation);
			expect(event).toBeInstanceOf(Event);
		});
	});

	test('ServiceWorkerContainer => ServiceWorkerContainerEventMap', () => {
		const target = new ServiceWorkerContainer();

		on(target, 'messageerror', function (this, event) {
			expect(this).toBeInstanceOf(ServiceWorkerContainer);
			expect(event).toBeInstanceOf(MessageEvent);
		});
	});

	test('ServiceWorkerRegistration => ServiceWorkerRegistrationEventMap', () => {
		const target = new ServiceWorkerRegistration();

		on(target, 'updatefound', function (this, event) {
			expect(this).toBeInstanceOf(ServiceWorkerRegistration);
			expect(event).toBeInstanceOf(Event);
		});
	});

	test('SourceBuffer => SourceBufferEventMap', () => {
		const target = new SourceBuffer();

		on(target, 'updatestart', function (this, event) {
			expect(this).toBeInstanceOf(SourceBuffer);
			expect(event).toBeInstanceOf(Event);
		});
	});

	test('SourceBufferList => SourceBufferListEventMap', () => {
		const target = new SourceBufferList();

		on(target, 'addsourcebuffer', function (this, event) {
			expect(this).toBeInstanceOf(SourceBufferList);
			expect(event).toBeInstanceOf(Event);
		});
	});

	test('SpeechRecognition => SpeechRecognitionEventMap', () => {
		const target = new SpeechRecognition();

		on(target, 'nomatch', function (this, event) {
			expect(this).toBeInstanceOf(SpeechRecognition);
			expect(event).toBeInstanceOf(SpeechRecognitionEvent);
		});
	});

	test('SpeechSynthesis => SpeechSynthesisEventMap', () => {
		const target = new SpeechSynthesis();

		on(target, 'voiceschanged', function (this, event) {
			expect(this).toBeInstanceOf(SpeechSynthesis);
			expect(event).toBeInstanceOf(Event);
		});
	});

	test('SpeechSynthesisUtterance => SpeechSynthesisUtteranceEventMap', () => {
		const target = new SpeechSynthesisUtterance();

		on(target, 'boundary', function (this, event) {
			expect(this).toBeInstanceOf(SpeechSynthesisUtterance);
			expect(event).toBeInstanceOf(SpeechSynthesisEvent);
		});
	});

	test('TextTrackCue => TextTrackCueEventMap', () => {
		const target = new VTTCue(1, 1, 'test');

		on(target, 'enter', function (this, event) {
			expect(this).toBeInstanceOf(TextTrackCue);
			expect(event).toBeInstanceOf(Event);
		});
	});

	test('TextTrack => TextTrackEventMap', () => {
		const target = new TextTrack();

		on(target, 'cuechange', function (this, event) {
			expect(this).toBeInstanceOf(TextTrack);
			expect(event).toBeInstanceOf(Event);
		});
	});

	test('TextTrackList => TextTrackListEventMap', () => {
		const target = new TextTrackList();

		on(target, 'removetrack', function (this, event) {
			expect(this).toBeInstanceOf(TextTrackList);
			expect(event).toBeInstanceOf(TrackEvent);
		});
	});

	test('VisualViewport => VisualViewportEventMap', () => {
		const target = new VisualViewport();

		on(target, 'resize', function (this, event) {
			expect(this).toBeInstanceOf(VisualViewport);
			expect(event).toBeInstanceOf(UIEvent);
		});
	});

	test('WebSocket => WebSocketEventMap', () => {
		const target = new WebSocket('test');

		on(target, 'close', function (this, event) {
			expect(this).toBeInstanceOf(WebSocket);
			expect(event).toBeInstanceOf(CloseEvent);
		});
	});

	test('XMLHttpRequestEventTarget => XMLHttpRequestEventTargetEventMap', () => {
		const target = new XMLHttpRequestEventTarget();

		on(target, 'loadstart', function (this, event) {
			expect(this).toBeInstanceOf(XMLHttpRequestEventTarget);
			expect(event).toBeInstanceOf(ProgressEvent);
		});
	});

});