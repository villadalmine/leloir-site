# Nerdearla 2026: Estrategia de Presentación Leloir

**Charla Aceptada:** "IA para diagnosticar Kubernetes: arquitectura multi-tenant con gobierno de costos por equipos"
**Duración:** 25 Minutos
**Formato:** Pre-grabada con Q&A en vivo de 5 minutos al final.
**Orquestadores:** Usuario (Speaker), Antigravity (Director de Presentación), Claude (Implementador Técnico).

## 1. El Concepto y el Pivot

La propuesta original con la que se ganó la entrada a Nerdearla estaba basada en el uso de **Envoy AI Gateway** y **HolmesGPT** (uniendo un gateway con un agente para controlar costos y aislar acceso). 

**El Pivot:** En lugar de cambiar la charla, usaremos esa arquitectura como el *pasado* (el problema y la prueba de concepto) para revelar a **Leloir** como el *presente* (la solución open-source definitiva).

**Mensaje Central:** "Ponerle agentes de IA a la infraestructura es peligroso y caro. La arquitectura de la hackathon demostró que gobernarlos con un API Gateway y un modelo Multi-Tenant funcionaba. Pero las empresas necesitan algo llave en mano. Por eso, de esa idea nació Leloir, el primer plano de control open-source para enrutar, auditar y contener agentes."

---

## 1.1. La Regla de Oro: Cero "Vendor Pitch"

Las conferencias técnicas odian que les intenten vender un producto comercial. Es vital que el tono de la charla sea el de un **ingeniero compartiendo sus cicatrices de batalla y sus descubrimientos**, no el de un CEO vendiendo un SaaS.

**¿Por qué Leloir encaja perfectamente y no viola esta regla?**
1. **No hay nada que vender:** Leloir es 100% Open Source (Apache 2.0). No tiene un modelo comercial, no tiene un tier de pago oculto, no pide tarjetas de crédito. Es infraestructura pura.
2. **El Modelo Open Core (La filosofía de monetización):** Nuestra postura es clarísima y muy justa: **"Si usas open-source, es gratis. Si te conectas a ecosistemas pagos, pagas la licencia."** Si integras Leloir con Dex (OIDC) o modelos locales (Ollama), el uso es 100% gratuito. La única forma en que Leloir cobra es si quieres los conectores Enterprise para plataformas corporativas pagas (Azure AD, AWS Cognito, Datadog, OpenAI Enterprise). Todo lo que mostraremos en la charla será el ecosistema puramente Open Source.
3. **El foco es el "Cómo", no el "Qué":** La charla no es un comercial sobre "usa Leloir". La charla es sobre los **desafíos de ingeniería** (aislamiento de RBAC, spoofing de identidades en Envoy, ruteo concurrente) y cómo resolvimos esos problemas arquitectónicamente construyendo esta plataforma.
4. **El Regalo:** Al final, Leloir se presenta como un "regalo a la comunidad", una implementación de referencia para que los SREs no tengan que reinventar la rueda, no como un producto corporativo.

---

## 1.5. Alineación con el Abstract Publicado

Tu abstract es perfecto y el guion cumple cada una de tus promesas textuales:

* *"¿cómo le das a cada equipo capacidades de diagnóstico con IA sin que todos compartan el mismo dashboard, sin mezclar sus permisos, y sin perder de vista cuánto gasta cada uno en tokens?"* -> **Se responde en el Minuto 4 (El Dolor) y se soluciona en la Demo (Minuto 15) mostrando el aislamiento de tenants.**
* *"Esta charla presenta el diseño de una plataforma de AIOps multi-tenant construida sobre Kubernetes... "* -> **Esa plataforma ES Leloir (se revela en el Minuto 9).**
* *"Vamos a recorrer la arquitectura: el motor de investigación con IA y sus capas (skills, toolsets, conexión a APIs externas vía MCP)... "* -> **Ese es exactamente el MCP Gateway y el sistema de AgentAdapters de Leloir.**
* *"y —la parte más interesante— cómo un AI Gateway permite medir y gobernar el consumo de tokens por equipo"* -> **Esa es la demostración en vivo del llmBroker integrado con Envoy AI GW en el Minuto 18 de la demo.**

---

## 2. Guión Estructural (25 Minutos)

### Minuto 0:00 - 04:00 | El Dolor (The Pain)
* **Visual:** Una alerta de Slack a las 3 AM que nadie entiende.
* **Narrativa:** "Le tiramos IA generativa a nuestros problemas de operaciones (SRE). Pero el remedio fue peor: facturas altísimas en OpenAI y agentes con permisos de cluster-admin rompiendo cosas en producción."
* **El desafío:** ¿Cómo democratizamos la IA para resolver incidentes en una empresa donde hay 50 equipos distintos y un presupuesto limitado?

### Minuto 04:00 - 09:00 | La Arquitectura de la Hackathon (The Concept)
* **Visual:** Diagrama del hackathon (HolmesGPT + Envoy AI Gateway).
* **Narrativa:** "Ese fue mi experimento inicial. Si poníamos un Gateway frente al agente, podíamos cortar el acceso a la llave maestra del proveedor y aplicar rate limits (tokens) por tenant. El concepto funcionó."

### Minuto 09:00 - 15:00 | La Revelación (Enter Leloir)
* **Visual:** El diagrama de arquitectura de Leloir (Control Plane, AgentAdapters, MCP Gateway, Tenants).
* **Narrativa:** "Pero esto es una conferencia de ingeniería, no de experimentos. Las empresas reales necesitan rutear alertas automáticamente, orquestar múltiples agentes especializados (A2A) y aplicar políticas Zero Trust. Así que agarré ese concepto de la hackathon y lo convertí en una plataforma open-source completa. Se llama Leloir."
* **Concepto clave:** Leloir NO es un agente. Es un **Orquestador de Orquestadores**. "Nosotros invocamos a HolmesGPT o agentes custom, pero nosotros gobernamos su perímetro".

### Minuto 15:00 - 22:00 | La Demo (Show, Don't Tell)
* **Visual:** Una grabación de pantalla pulida y perfecta.
* **Flujo de la demo:**
  1. El "Tenant A" (equipo de frontend) recibe una alerta. Leloir la rutea automáticamente a HolmesGPT.
  2. HolmesGPT resuelve el incidente exitosamente y Leloir le descuenta $0.15 de su presupuesto mensual.
  3. El "Tenant B" intenta abusar del sistema, pero el Gateway (Envoy) lo bloquea porque agotó su presupuesto. 
  4. Vemos cómo el agente del Tenant A intenta listar pods del Tenant B, y falla gracias al aislamiento del MCP Gateway (Zero Trust).

### Minuto 22:00 - 25:00 | Cierre, Open Source y Q&A Prep
* **Visual:** Pantalla gigante con código QR a GitHub (`villadalmine/leloir`) y la web (`leloir-site`).
* **Narrativa:** "Leloir está 100% open-source, construido para el ecosistema Kubernetes. Instálalo hoy con nuestro Helm Chart público."

---

## 3. División de Tareas (Orquestación Multi-Agente)

Para llegar perfectos a la fecha de grabación (julio-agosto), este es nuestro pacto de trabajo:

| Rol | Tareas Asignadas |
|---|---|
| **Antigravity (Yo)** | - Gobernaré esta presentación y la narrativa.<br>- Diseñaré los slides visuales (si usamos markdown/react) en el `leloir-site`.<br>- Armaré el guion palabra por palabra para que lo leas en el video.<br>- Seré el revisor técnico de Claude para asegurar que lo que mostremos funcione de verdad. |
| **Claude** | - Implementar el Chart de Helm público (actualmente en curso) para que la gente tenga qué instalar al final de la charla.<br>- Levantar el entorno de demo perfecto en Kubernetes (con Envoy, HolmesGPT y los 2 tenants) para poder grabar la demo sin fallos. |
| **Humano (Tú)** | - Orquestarnos. Eres el nexo entre Claude (backend/infra) y yo (frontend/marketing/estrategia).<br>- Llenar los datos logísticos en Sessionize hoy mismo.<br>- Grabar el video cuando tengamos el entorno y el guion listo. |
