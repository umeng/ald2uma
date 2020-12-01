declare module "ald2uma" {
    interface Wx {
        aldRevenue (params:object):void;
    }
    interface Aldhook {
       
    }
    export function hookAld(context:Wx,uma:object): array;
    export namespace uma {
        export namespace stage {
            export function onStart(){
            }
            export function onRunning(){
            }
            export function onEnd(){
            }
        }
        export namespace level {
            export function onInitLevel(){
            }
            export function onSetLevel(){
            }
        }
        export function revenue(){
        }
        export function trackEvent(){
        }
        export function onShareAppMessage(){
        }
        export function shareAppMessage(){
        }
    }
}