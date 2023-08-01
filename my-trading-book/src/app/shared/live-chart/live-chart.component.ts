import { Component, Input, OnInit, OnDestroy } from '@angular/core';
declare var TradingView: any;

@Component({
  selector: 'app-live-chart',
  templateUrl: './live-chart.component.html',
  styleUrls: ['./live-chart.component.scss']
})
export class LiveChartComponent implements OnInit {
  ngOnInit() {
    this.loadTradingViewWidget();
  }

  private loadTradingViewWidget() {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => this.initTradingViewWidget();
    document.getElementsByTagName('head')[0].appendChild(script);
  }

  private initTradingViewWidget() {
    new TradingView.widget({
      width: "100%",
      height: 610,
      symbol: 'NASDAQ:AAPL',
      interval: 'D',
      timezone: 'Etc/UTC',
      theme: 'light',
      style: '1',
      locale: 'en',
      toolbar_bg: '#f1f3f6',
      enable_publishing: false,
      allow_symbol_change: true,
      container_id: 'tradingview_cd3cf',
    });
  }
}
